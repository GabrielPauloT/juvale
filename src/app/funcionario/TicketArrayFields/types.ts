import { ReponseTicket } from "@/service/types/employee";

export type TicketArrayFieldsProps = {
  codeEmployee: string;
  data: ReponseTicket[] | undefined;
  onChange?: (tickets: requestTicket[]) => void;
};

export type requestTicket = {
  id: number;
  value: number;
  codeEmployee: string;
};
