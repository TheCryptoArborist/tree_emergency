import { EMERGENCY_REQUEST_TYPES, type RawTreeRequest, type RequestPriority } from "./types";

function normalized(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isEmergencyTreeRequest(request: Pick<RawTreeRequest, "requestType">): boolean {
  const requestType = normalized(request.requestType);
  return EMERGENCY_REQUEST_TYPES.some((type) => normalized(type) === requestType);
}

export function classifyPriority(request: Pick<RawTreeRequest, "requestType">): RequestPriority {
  return isEmergencyTreeRequest(request) ? "emergency" : "secondary";
}
