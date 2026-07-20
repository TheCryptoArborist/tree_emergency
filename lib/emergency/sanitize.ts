import { classifyPriority } from "./classify";
import type { PublicTreeRequest, RawTreeRequest, RequestStatus } from "./types";

const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_PATTERN = /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/g;
const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]/g;

function text(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;

  const sanitized = value
    .replace(EMAIL_PATTERN, "[email removed]")
    .replace(PHONE_PATTERN, "[phone removed]")
    .replace(CONTROL_CHARACTERS, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!sanitized) return null;
  return sanitized.slice(0, maxLength);
}

function numberInRange(value: unknown, minimum: number, maximum: number): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= minimum && parsed <= maximum ? parsed : null;
}

function normalizedStatus(value: unknown): RequestStatus {
  const status = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (["open", "new", "submitted"].includes(status)) return "open";
  if (["in progress", "in_progress", "assigned", "pending"].includes(status)) return "in_progress";
  if (["closed", "resolved", "complete", "completed"].includes(status)) return "closed";
  return "unknown";
}

function isoDate(value: unknown): string | null {
  if (typeof value !== "string" && !(value instanceof Date)) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function daysOpen(submittedAt: string | null, status: RequestStatus, now: Date): number | null {
  if (!submittedAt || status === "closed") return null;
  const submitted = new Date(submittedAt);
  return Math.max(0, Math.floor((now.getTime() - submitted.getTime()) / 86_400_000));
}

function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function toPublicTreeRequest(raw: RawTreeRequest, now = new Date()): PublicTreeRequest {
  const submittedAt = isoDate(raw.submittedAt);
  const status = normalizedStatus(raw.status);

  return {
    id: text(raw.id, 80) ?? "unknown",
    requestType: text(raw.requestType, 120) ?? "Tree-related request",
    priority: classifyPriority(raw),
    publicLocation: text(raw.address, 180),
    publicDescription: text(raw.description, 500),
    status,
    submittedAt,
    daysOpen: daysOpen(submittedAt, status, now),
    latitude: numberInRange(raw.latitude, -90, 90),
    longitude: numberInRange(raw.longitude, -180, 180),
    publicUrl: safeUrl(raw.publicUrl)
  };
}
