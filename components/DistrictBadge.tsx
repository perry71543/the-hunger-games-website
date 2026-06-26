import type { District } from "@/lib/data";

type DistrictBadgeProps = {
  district: District;
  size?: "sm" | "lg";
};

const districtCodes: Record<string, string> = {
  "1": "LX",
  "2": "DF",
  "3": "TC",
  "4": "SE",
  "5": "PW",
  "6": "TR",
  "7": "LB",
  "8": "TX",
  "9": "GR",
  "10": "LV",
  "11": "AG",
  "12": "CL",
  "13": "UD",
};

export function DistrictBadge({ district, size = "sm" }: DistrictBadgeProps) {
  const isLarge = size === "lg";

  return (
    <div
      className={`district-badge ${isLarge ? "h-40 w-40" : "h-16 w-16"}`}
      aria-label={`${district.name} archive badge`}
    >
      <span
        className={`font-black text-orange-100 ${
          isLarge ? "text-5xl" : "text-lg"
        }`}
      >
        {district.id.padStart(2, "0")}
      </span>
      <span
        className={`mt-1 uppercase tracking-[0.08em] text-stone-500 ${
          isLarge ? "text-xs" : "text-[9px]"
        }`}
      >
        {districtCodes[district.id] ?? "DR"}
      </span>
    </div>
  );
}
