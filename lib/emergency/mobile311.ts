import type { RawTreeRequest, SourceStatus } from "./types";
import { sourceUrls } from "./sourceUrls";

interface Mobile311Result {
  requests: RawTreeRequest[];
  status: SourceStatus;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractRows(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  for (const key of ["data", "results", "requests", "features"]) {
    const value = payload[key];
    if (Array.isArray(value)) return value;
  }

  return [];
}

function normalizeRow(value: unknown): RawTreeRequest | null {
  if (!isRecord(value)) return null;

  const properties = isRecord(value.properties) ? value.properties : value;
  const geometry = isRecord(value.geometry) ? value.geometry : null;
  const coordinates = geometry && Array.isArray(geometry.coordinates) ? geometry.coordinates : null;

  return {
    id: properties.id ?? properties.request_id ?? properties.service_request_id,
    requestType:
      properties.requestType ??
      properties.request_type ??
      properties.service_name ??
      properties.category,
    address: properties.address ?? properties.location ?? properties.street_address,
    description: properties.description ?? properties.public_description ?? properties.notes,
    status: properties.status ?? properties.request_status,
    submittedAt:
      properties.submittedAt ??
      properties.submitted_at ??
      properties.created_at ??
      properties.requested_datetime,
    latitude: properties.latitude ?? properties.lat ?? (coordinates ? coordinates[1] : null),
    longitude: properties.longitude ?? properties.lng ?? properties.lon ?? (coordinates ? coordinates[0] : null),
    publicUrl: properties.publicUrl ?? properties.public_url ?? properties.url
  };
}

export async function getMobile311Requests(now = new Date()): Promise<Mobile311Result> {
  const endpoint = process.env.MOBILE_311_DATA_URL?.trim();

  if (!endpoint) {
    return {
      requests: [],
      status: {
        id: "mobile-311",
        label: "Mobile 311 tree requests",
        mode: "error",
        checkedAt: now.toISOString(),
        message: "No validated public Mobile 311 data endpoint is configured. No current incidents are being inferred.",
        officialUrl: sourceUrls.mobile311Public
      }
    };
  }

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload: unknown = await response.json();
    const requests = extractRows(payload)
      .map(normalizeRow)
      .filter((row): row is RawTreeRequest => row !== null);

    return {
      requests,
      status: {
        id: "mobile-311",
        label: "Mobile 311 tree requests",
        mode: "live",
        checkedAt: now.toISOString(),
        message: `Retrieved ${requests.length} public request records from the configured source.`,
        officialUrl: sourceUrls.mobile311Public
      }
    };
  } catch (error) {
    return {
      requests: [],
      status: {
        id: "mobile-311",
        label: "Mobile 311 tree requests",
        mode: "error",
        checkedAt: now.toISOString(),
        message: `The configured source could not be retrieved: ${error instanceof Error ? error.message : "unknown error"}. No current incidents are being inferred.`,
        officialUrl: sourceUrls.mobile311Public
      }
    };
  }
}
