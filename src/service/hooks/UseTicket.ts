import { useMutation } from "@tanstack/react-query";
import { createTicket } from "../requests/TicketRequest";
import { TicketBatchRequest } from "../types/ticket";

export function useCreateTicket() {
  const mutation = useMutation({
    mutationFn: (
      data: TicketBatchRequest[]) => createTicket( data),
  });
  return mutation;
}