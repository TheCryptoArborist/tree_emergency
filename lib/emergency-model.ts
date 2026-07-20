export const operatingLevels = [
  {
    id: "normal",
    label: "Level 0 — Normal",
    description: "No active tree-related weather operation. Preparedness and educational information remain available."
  },
  {
    id: "monitoring",
    label: "Level 1 — Monitoring",
    description: "Potential weather impacts are being watched. No public report map is active."
  },
  {
    id: "activated",
    label: "Level 2 — Activated",
    description: "A qualifying weather event is affecting the area and public non-emergency reports may be accepted."
  },
  {
    id: "recovery",
    label: "Level 3 — Recovery",
    description: "The immediate event has passed, but verified obstruction and damage information may remain active."
  }
] as const;

export const reportCategories = [
  { id: "blocked-road", label: "Road or access blocked", publicLabel: "Access obstruction" },
  { id: "tree-on-structure", label: "Tree or limb on a structure", publicLabel: "Structure impact" },
  { id: "whole-tree-failure", label: "Whole-tree failure or uprooting", publicLabel: "Tree failure" },
  { id: "large-limb-failure", label: "Large broken or suspended limb", publicLabel: "Large limb failure" },
  { id: "split-or-severe-lean", label: "Split trunk or severe new lean", publicLabel: "Structural concern" },
  { id: "utility-conflict", label: "Tree contacting or near utility conductors", publicLabel: "Utility-related hazard" },
  { id: "other", label: "Other storm-related tree condition", publicLabel: "Other tree condition" }
] as const;

export const urgencyLevels = [
  {
    id: "emergency",
    label: "Immediate emergency",
    description: "Life safety, active fire, occupied structure collapse, energized conductors, or blocked emergency access. Use 911 or the responsible utility—not this form."
  },
  {
    id: "high",
    label: "High concern",
    description: "A major failure or obstruction is present, but no immediate life-threatening condition is known."
  },
  {
    id: "moderate",
    label: "Moderate concern",
    description: "Damage is visible and should be evaluated, but access remains available and the area can be avoided."
  },
  {
    id: "information",
    label: "Information only",
    description: "A non-urgent observation useful for event documentation or recovery awareness."
  }
] as const;

export const verificationStatuses = [
  { id: "submitted", label: "Submitted", public: false },
  { id: "screening", label: "Under screening", public: false },
  { id: "needs-information", label: "More information needed", public: false },
  { id: "verified", label: "Verified", public: true },
  { id: "official-source", label: "Confirmed by official source", public: true },
  { id: "resolved", label: "Resolved", public: true },
  { id: "rejected", label: "Not published", public: false },
  { id: "duplicate", label: "Duplicate report", public: false }
] as const;

export type OperatingLevel = (typeof operatingLevels)[number]["id"];
export type ReportCategory = (typeof reportCategories)[number]["id"];
export type UrgencyLevel = (typeof urgencyLevels)[number]["id"];
export type VerificationStatus = (typeof verificationStatuses)[number]["id"];
