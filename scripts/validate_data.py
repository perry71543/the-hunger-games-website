#!/usr/bin/env python3
"""Validate local JSON data for the Mockingjay Memorial Archive."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"

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


def validate_file(filename: str, required_fields: set[str]) -> None:
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


def main() -> int:
    try:
        for filename, required_fields in SCHEMAS.items():
            validate_file(filename, required_fields)
    except ValueError as exc:
        print(f"validation failed: {exc}", file=sys.stderr)
        return 1

    print("validation passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
