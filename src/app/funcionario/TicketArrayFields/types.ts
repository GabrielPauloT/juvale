import { reponseTicket } from "@/service/types/employee";

export type TicketArrayFieldsProps = {
  codeEmployee: string
  data: reponseTicket[] | undefined
  onChange?: (tickets: requestTicket[]) => void;
}

export type requestTicket = {
  id: number
  value: number
  codeEmployee: string
}