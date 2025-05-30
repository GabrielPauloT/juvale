"use client"

import { useEffect, useState } from "react"
import { requestTicket, TicketArrayFieldsProps } from "./types";

export function TicketArrayFields({ codeEmployee, data, onChange }: TicketArrayFieldsProps) {
  const [tickets, setTickets] = useState<requestTicket[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    if (data?.length) {
      const parsed = data.map((item) => ({
        id: item.id,
        value: item.value.toString(),
        codeEmployee,
      }));
      setTickets(parsed);
      const maxId = Math.max(...parsed.map((t) => t.id), 0);
      setNextId(maxId + 1);
    }
  }, [data, codeEmployee]);

  useEffect(() => {
    onChange?.(tickets);
  }, [tickets]);

  const addTicket = () => {
    const newTicket: requestTicket = {
      id: nextId,
      value: "0.0",
      codeEmployee,
    };
    setTickets((prev) => [...prev, newTicket]);
    setNextId((prev) => prev + 1);
  };

  const removeTicket = (id: number) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  const updateTicketValue = (id: number, value: string) => {
    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === id ? { ...ticket, value } : ticket))
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {tickets.map((ticket, index) => (
        <div key={ticket.id} className="flex gap-3 items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 rounded-lg shadow-sm">
          <span className="text-sm text-gray-500 dark:text-gray-400">#{index + 1}</span>
          <input
            type="number"
            value={ticket.value}
            onChange={(e) => updateTicketValue(ticket.id, e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={() => removeTicket(ticket.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors">
            Remover
          </button>
        </div>
      ))}
      <button onClick={addTicket} className="self-start mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
        Adicionar Novo Ticket
      </button>
    </div>
  );
}
