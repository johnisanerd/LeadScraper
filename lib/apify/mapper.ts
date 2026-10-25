import { ApifyGoogleMapsItem } from "./types";

export interface NormalizedProspect {
  company_name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  google_rating: number | null;
  review_count: number | null;
  google_maps_url: string | null;
}

export function normalizeApifyItem(item: ApifyGoogleMapsItem): NormalizedProspect {
  const company_name = sanitizeString(item.title ?? item.name);
  const address = sanitizeString(item.address);
  const phone = sanitizeString(item.phoneNumber ?? item.phone);
  const website = sanitizeWebsite(item.website);
  const google_rating = normalizeNumber(item.rating ?? item.totalScore ?? item.stars);
  const review_count = normalizeInt(item.ratingCount ?? item.reviewsCount);
  const google_maps_url = sanitizeString(item.url);

  return {
    company_name: company_name ?? "Prospect sans nom",
    address,
    phone,
    website,
    google_rating,
    review_count,
    google_maps_url,
  };
}

function sanitizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function sanitizeWebsite(value: unknown): string | null {
  const raw = sanitizeString(value);
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

function normalizeNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

function normalizeInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

export function isValidProspect(prospect: NormalizedProspect): boolean {
  return prospect.company_name !== "Prospect sans nom";
}
