#!/usr/bin/env python3
"""Validate local JSON data for the Mockingjay Memorial Archive."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
PUBLIC_DIR = ROOT / "public"
NOTES_DIR = ROOT / "content" / "notes"
SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

SCHEMAS: dict[str, set[str]] = {
    "characters.json": {
        "name",
        "slug",
        "district",
        "role",
        "firstAppearance",
        "description",
        "tags",
        "relatedQuotes",
    },
    "districts.json": {
        "id",
        "name",
        "industry",
        "status",
        "description",
        "notableCharacters",
    },
    "timeline.json": {
        "id",
        "era",
        "title",
        "description",
        "relatedCharacters",
    },
    "quotes.json": {
        "id",
        "text",
        "speaker",
        "source",
        "note",
    },
    "gallery.json": {
        "id",
        "title",
        "category",
        "src",
        "alt",
        "description",
    },
    "relationships.json": {
        "id",
        "source",
        "target",
        "type",
        "note",
    },
}

LIST_FIELDS = {
    "tags",
    "relatedQuotes",
    "notableCharacters",
    "relatedCharacters",
}


def load_json(path: Path) -> list[dict[str, Any]]:
    try:
        with path.open("r", encoding="utf-8") as file:
            data = json.load(file)
    except FileNotFoundError:
        raise ValueError(f"{path.name} not found")
    except json.JSONDecodeError as exc:
        raise ValueError(f"{path.name} JSON parse error: {exc}") from exc

    if not isinstance(data, list):
        raise ValueError(f"{path.name} must contain a JSON array")

    for index, item in enumerate(data, start=1):
        if not isinstance(item, dict):
            raise ValueError(f"{path.name} item #{index} must be an object")

    return data


def validate_file(filename: str, required_fields: set[str]) -> list[dict[str, Any]]:
    rows = load_json(DATA_DIR / filename)

    if not rows:
        raise ValueError(f"{filename} must contain at least one item")

    seen_ids: set[str] = set()
    unique_field = "slug" if filename == "characters.json" else "id"

    for index, item in enumerate(rows, start=1):
        missing = sorted(required_fields - item.keys())
        if missing:
            raise ValueError(
                f"{filename} item #{index} missing required fields: {', '.join(missing)}"
            )

        for field in required_fields:
            value = item[field]
            if field in LIST_FIELDS:
                if not isinstance(value, list) or not all(
                    isinstance(entry, str) and entry.strip() for entry in value
                ):
                    raise ValueError(
                        f"{filename} item #{index} field '{field}' must be a list of strings"
                    )
            elif not isinstance(value, str) or not value.strip():
                raise ValueError(
                    f"{filename} item #{index} field '{field}' must be a non-empty string"
                )

        unique_value = item[unique_field]
        if unique_value in seen_ids:
            raise ValueError(f"{filename} has duplicate {unique_field}: {unique_value}")
        seen_ids.add(unique_value)

        if filename == "characters.json" and not SLUG_PATTERN.match(item["slug"]):
            raise ValueError(
                f"{filename} item #{index} has invalid slug: {item['slug']}"
            )

        if filename == "gallery.json":
            image_path = PUBLIC_DIR / item["src"].lstrip("/")
            if not image_path.exists():
                raise ValueError(
                    f"{filename} item #{index} image not found: {item['src']}"
                )

    return rows


def validate_cross_references(data: dict[str, list[dict[str, Any]]]) -> None:
    character_names = {item["name"] for item in data["characters.json"]}
    district_ids = {item["id"] for item in data["districts.json"]}
    expected_district_ids = {str(number) for number in range(1, 14)}

    if district_ids != expected_district_ids:
        missing = sorted(expected_district_ids - district_ids, key=int)
        extra = sorted(district_ids - expected_district_ids)
        details = []
        if missing:
            details.append(f"missing districts: {', '.join(missing)}")
        if extra:
            details.append(f"unexpected districts: {', '.join(extra)}")
        raise ValueError("districts.json must contain District 1-13; " + "; ".join(details))

    for event in data["timeline.json"]:
        for name in event["relatedCharacters"]:
            if name not in character_names:
                raise ValueError(
                    f"timeline.json event '{event['id']}' references unknown character: {name}"
                )

    for relationship in data["relationships.json"]:
        for field in ("source", "target"):
            if relationship[field] not in character_names:
                raise ValueError(
                    f"relationships.json item '{relationship['id']}' references unknown character: {relationship[field]}"
                )


def validate_notes() -> None:
    note_files = sorted(NOTES_DIR.glob("*.md"))
    if not note_files:
        raise ValueError("content/notes must contain at least one Markdown note")

    required_fields = {"title", "date", "category", "excerpt", "relatedCharacters"}

    for path in note_files:
        content = path.read_text(encoding="utf-8")
        match = re.match(r"^---\n(?P<frontmatter>[\s\S]*?)\n---\n", content)
        if not match:
            raise ValueError(f"{path.name} missing frontmatter block")

        frontmatter_keys = {
            line.split(":", 1)[0].strip()
            for line in match.group("frontmatter").splitlines()
            if ":" in line
        }
        missing = sorted(required_fields - frontmatter_keys)
        if missing:
            raise ValueError(
                f"{path.name} missing frontmatter fields: {', '.join(missing)}"
            )

        slug = path.stem
        if not SLUG_PATTERN.match(slug):
            raise ValueError(f"{path.name} has invalid note slug")


def main() -> int:
    try:
        loaded_data: dict[str, list[dict[str, Any]]] = {}
        for filename, required_fields in SCHEMAS.items():
            loaded_data[filename] = validate_file(filename, required_fields)
        validate_cross_references(loaded_data)
        validate_notes()
    except ValueError as exc:
        print(f"validation failed: {exc}", file=sys.stderr)
        return 1

    print("validation passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
