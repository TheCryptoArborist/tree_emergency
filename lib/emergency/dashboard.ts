import { sampleTreeRequests } from "./sampleData";
import { toPublicTreeRequest } from "./sanitize";
import type { EmergencyPublicPayload, RawTreeRequest, SourceStatus } from "./types";

const DISCLAIMER =
  "This independent awareness resource is not an official City of Mobile reporting system, emergency dispatch service, or substitute for 911, utility emergency lines, municipal reporting, or professional on-site evaluation.";

function buildSourceStatuses(now: Date): SourceStatus[] {
  return [
    {
      id: "mobile-311",
      label: "Mobile 311 tree requests",
      mode: "sample",
      checkedAt: now.toISOString(),
      message: "Live source adapter is not connected. Demonstration records are being returned and are clearly labeled SAMPLE.",
      officialUrl: null
    }
  ];
}

export function buildPublicPayload(
  rawRequests: RawTreeRequest[] = sampleTreeRequests,
  now = new Date()
): EmergencyPublicPayload {
  const requests = rawRequests.map((request) => toPublicTreeRequest(request, now));

  return {
    generatedAt: now.toISOString(),
    jurisdiction: "Mobile, Alabama",
    disclaimer: DISCLAIMER,
    emergencyRequests: requests.filter((request) => request.priority === "emergency"),
    secondaryRequests: requests.filter((request) => request.priority === "secondary"),
    sourceStatuses: buildSourceStatuses(now)
  };
}
