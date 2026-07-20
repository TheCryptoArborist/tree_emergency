export const EMERGENCY_REQUEST_TYPES = [
  "Tree/Limb Down in Street",
  "Broken/Hanging Limb in Right-of-Way"
] as const;

export type EmergencyRequestType = (typeof EMERGENCY_REQUEST_TYPES)[number];

export type SourceMode = "live" | "sample" | "error";
export type RequestPriority = "emergency" | "secondary";
export type RequestStatus = "open" | "in_progress" | "closed" | "unknown";

export interface PublicTreeRequest {
  id: string;
  requestType: string;
  priority: RequestPriority;
  publicLocation: string | null;
  publicDescription: string | null;
  status: RequestStatus;
  submittedAt: string | null;
  daysOpen: number | null;
  latitude: number | null;
  longitude: number | null;
  publicUrl: string | null;
}

export interface SourceStatus {
  id: string;
  label: string;
  mode: SourceMode;
  checkedAt: string;
  message: string;
  officialUrl: string | null;
}

export interface EmergencyPublicPayload {
  generatedAt: string;
  jurisdiction: "Mobile, Alabama";
  disclaimer: string;
  emergencyRequests: PublicTreeRequest[];
  secondaryRequests: PublicTreeRequest[];
  sourceStatuses: SourceStatus[];
}

export interface RawTreeRequest {
  id?: unknown;
  requestType?: unknown;
  address?: unknown;
  description?: unknown;
  status?: unknown;
  submittedAt?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  publicUrl?: unknown;
}
