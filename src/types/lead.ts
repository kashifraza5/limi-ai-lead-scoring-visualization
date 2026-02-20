export type LeadStatus = "cold" | "warm" | "hot";

export interface Lead {
  id: string;
  name: string;
  email: string;
  companySize: string;
  budget: number;
  description: string;
  score: number;
  status: LeadStatus;
  manualOverride: boolean;
  createdAt: string;
}
