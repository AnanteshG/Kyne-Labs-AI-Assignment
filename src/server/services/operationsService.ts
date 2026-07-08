import { artifacts, hands } from "@/server/mock-db";
import { operationsRepository } from "@/server/repositories/operationsRepository";
import type { Role } from "@/domain/types";

export const operationsService = {
  login(role?: Role) {
    const user = operationsRepository.getUserByRole(role);
    return { user, token: `mock-session-${user.role}` };
  },
  getPortfolio() {
    return operationsRepository.getPortfolioSummary();
  },
  getReadiness() {
    return operationsRepository.getReadiness();
  },
  getPolicyPacks() {
    return { policyPacks: operationsRepository.getPolicyPacks() };
  },
  generateCoworkerSession() {
    return {
      sessionId: "cw1",
      message: "Draft hand artifacts generated with compliance gates.",
      artifacts
    };
  },
  listHands() {
    return { hands: operationsRepository.getHands() };
  },
  createDraftHand() {
    return { hand: hands[0] };
  },
  getHand(id: string) {
    return operationsRepository.getHand(id);
  },
  listApprovals() {
    return { approvals: operationsRepository.getApprovals() };
  },
  resolveApproval(id: string) {
    return operationsRepository.resolveApproval(id);
  },
  getRun(id: string) {
    return operationsRepository.getRun(id);
  },
  getRunEvents(id: string) {
    return operationsRepository.getRunEvents(id);
  },
  listCustomers() {
    return { customers: operationsRepository.getCustomers() };
  },
  getCustomer(id: string) {
    return operationsRepository.getCustomer(id);
  }
};
