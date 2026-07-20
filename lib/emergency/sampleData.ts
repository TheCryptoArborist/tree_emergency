import type { RawTreeRequest } from "./types";

export const sampleTreeRequests: RawTreeRequest[] = [
  {
    id: "SAMPLE-001",
    requestType: "Tree/Limb Down in Street",
    address: "Sample location near central Mobile",
    description: "Demonstration record only. Large limb reported across one travel lane.",
    status: "open",
    submittedAt: "2026-07-20T12:00:00.000Z",
    latitude: 30.6954,
    longitude: -88.0399,
    publicUrl: null
  },
  {
    id: "SAMPLE-002",
    requestType: "Tree Trimming Request",
    address: "Sample public right-of-way location",
    description: "Demonstration record only. Routine vegetation concern with no reported obstruction.",
    status: "in progress",
    submittedAt: "2026-07-18T15:30:00.000Z",
    latitude: 30.682,
    longitude: -88.066,
    publicUrl: null
  }
];
