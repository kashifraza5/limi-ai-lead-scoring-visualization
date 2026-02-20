import { LeadStatus } from "@/types/lead";

export function resolveStatus(score: number): LeadStatus {
  if (score >= 80) return "hot";
  if (score >= 41) return "warm";
  return "cold";
}
