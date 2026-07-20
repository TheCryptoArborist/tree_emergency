import { getMobile311Requests } from "./mobile311";
import { sourceUrls } from "./sourceUrls";
import { toPublicTreeRequest } from "./sanitize";
import type { EmergencyPublicPayload, RawTreeRequest, SourceStatus } from "./types";

const DISCLAIMER =
  "This independent awareness resource is not an official City of Mobile reporting system, emergency dispatch service, or substitute for 911, utility emergency lines, municipal reporting, or professional on-site evaluation.";

function supportingSourceStatuses(now: Date): SourceStatus[] {
  return [
    {
      id: "alabama-power",
      label: "Alabama Power outage map",
      mode: "live",
      checkedAt: now.toISOString(),
      message: "Official outage-map access is available as contextual information. Outage data is not interpreted as a tree-hazard report.",
      officialUrl: sourceUrls.alabamaPowerOutageMap
    },
    {
      id: "nws-mobile",
      label: "NWS Mobile/Pensacola",
      mode: "live",
      checkedAt: now.toISOString(),
      message: "Official local weather and warning resources are available.",
      officialUrl: sourceUrls.nwsMobilePensacola
    },
    {
      id: "nhc-atlantic",
      label: "National Hurricane Center Atlantic outlook",
      mode: "live",
      checkedAt: now.toISOString(),
      message: "Official Atlantic, Caribbean, and Gulf tropical outlook resources are available.",
      officialUrl: sourceUrls.nhcAtlanticOutlook
    }
  ];
}

function assemblePayload(
  rawRequests: RawTreeRequest[],
  sourceStatuses: SourceStatus[],
  now: Date
): EmergencyPublicPayload {
  const requests = rawRequests.map((request) => toPublicTreeRequest(request, now));

  return {
    generatedAt: now.toISOString(),
    jurisdiction: "Mobile, Alabama",
    disclaimer: DISCLAIMER,
    emergencyRequests: requests.filter((request) => request.priority === "emergency"),
    secondaryRequests: requests.filter((request) => request.priority === "secondary"),
    sourceStatuses
  };
}

export function buildPublicPayload(
  rawRequests: RawTreeRequest[] = [],
  now = new Date(),
  sourceStatuses: SourceStatus[] = supportingSourceStatuses(now)
): EmergencyPublicPayload {
  return assemblePayload(rawRequests, sourceStatuses, now);
}

export async function getPublicPayload(now = new Date()): Promise<EmergencyPublicPayload> {
  const mobile311 = await getMobile311Requests(now);

  return assemblePayload(
    mobile311.requests,
    [mobile311.status, ...supportingSourceStatuses(now)],
    now
  );
}
