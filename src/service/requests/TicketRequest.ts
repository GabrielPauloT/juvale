import { api } from "../api";
import { TicketBatchRequest } from "../types/ticket";

export function createTicket(data: TicketBatchRequest[]) {
  return api.post(`/ticket/batch`, data);
}