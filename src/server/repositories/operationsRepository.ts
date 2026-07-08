import {
  approvals,
  auditEvents,
  customers,
  dataSources,
  hands,
  policyPacks,
  portfolio,
  runEvents,
  runs,
  users,
  validationReport
} from "@/server/mock-db";
import type { Role } from "@/domain/types";

export const operationsRepository = {
  getUserByRole(role?: Role) {
    return users.find((user) => user.role === role) ?? users[0];
  },
  getPortfolioSummary() {
    return { portfolio, activeHands: hands };
  },
  getReadiness() {
    return { dataSources, policyPacks, validationReport };
  },
  getPolicyPacks() {
    return policyPacks;
  },
  getHands() {
    return hands;
  },
  getHand(id: string) {
    const hand = hands.find((item) => item.id === id);
    if (!hand) return null;
    return { hand, approvals: approvals.filter((approval) => approval.handId === id) };
  },
  getApprovals() {
    return approvals;
  },
  resolveApproval(id: string) {
    const approval = approvals.find((item) => item.id === id);
    if (!approval) return null;
    return { ...approval, status: "approved" as const };
  },
  getRun(id: string) {
    const run = runs.find((item) => item.id === id);
    if (!run) return null;
    return { run, runEvents, auditEvents };
  },
  getRunEvents(id: string) {
    return { runId: id, events: runEvents };
  },
  getCustomers() {
    return customers;
  },
  getCustomer(id: string) {
    return customers.find((customer) => customer.id === id) ?? null;
  }
};
