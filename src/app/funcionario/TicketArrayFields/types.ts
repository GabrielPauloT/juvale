import { reponseTicket } from "@/service/types/employee";

export type TicketArrayFieldsProps = {
  codeEmployee: string
  data: reponseTicket[] | undefined
  onChange?: (tickets: requestTicket[]) => void;
}

export type requestTicket = {
  id: number
  value: string
  codeEmployee: string
}