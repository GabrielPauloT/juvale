"use client";

import { useEffect, useState } from "react";
import { requestTicket, TicketArrayFieldsProps } from "./types";

export function TicketArrayFields({
  codeEmployee,
  data,
  onChange,
}: TicketArrayFieldsProps) {
  const [tickets, setTickets] = useState<requestTicket[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    if (data?.length) {
      const parsed = data.map((item) => ({
        id: item.id,
        value: Number(item.value),
        codeEmployee,
      }));
      setTickets(parsed);
      const maxId = Math.max(...parsed.map((t) => t.id), 0);
      setNextId(maxId + 1);
    }
  }, [data, codeEmployee]);

  useEffect(() => {
    onChange?.(tickets);
  }, [onChange, tickets]);

  const addTicket = () => {
    const newTicket: requestTicket = {
      id: nextId,
      value: 0.0,
      codeEmployee,
    };
    setTickets((prev) => [...prev, newTicket]);
    setNextId((prev) => prev + 1);
  };

  const removeTicket = (id: number) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  const updateTicketValue = (id: number, rawValue: string) => {
    const sanitized = rawValue.replace(/[^\d]/g, "");
    const numeric = Number(sanitized) / 100;
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, value: numeric } : ticket
      )
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {tickets.map((ticket, index) => (
        <div
          key={ticket.id}
          className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 rounded-lg shadow-sm w-full"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
            #{index + 1}
          </div>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            value={formatCurrency(ticket.value)}
            onChange={(e) => updateTicketValue(ticket.id, e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
          <button
            onClick={() => removeTicket(ticket.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors w-full sm:w-auto"
          >
            Remover
          </button>
        </div>
      ))}
      <button
        onClick={addTicket}
        className="self-start mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
      >
        Adicionar Novo Ticket
      </button>
    </div>
  );
}
