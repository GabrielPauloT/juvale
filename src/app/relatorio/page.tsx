"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { ModalBase } from "@/components/ModalBase";
import {
  reportsCompany,
  reportsCompanyEmployee,
  reportsCompanyEmployeeWithAbsences,
} from "@/service/requests/reportsRequest";
import { useCallback, useMemo, useState } from "react";

type Data = {
  id: number;
  name: string;
};

export default function RelatorioPage() {
  const [openModal, setOpenModal] = useState(false);
  const [row, setRow] = useState<Data>();

  const [date, setDate] = useState("");

  const data: Data[] = useMemo(
    () => [
      {
        id: 1,
        name: "Relatório de Gastos por Empresa",
      },
      {
        id: 2,
        name: "Relatório de Gastos por Funcionário",
      },
      {
        id: 3,
        name: "Relatório de Gastos por Funcionário (com Faltas)",
      },
    ],
    []
  );

  const handleImprimirRelatorio = useCallback(() => {
    if (row?.id === 1) {
      reportsCompany(date, "Relatório de Gastos por Empresa")
        .then(() => {})
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setOpenModal((openModal) => !openModal);
        });
    } else if (row?.id === 2) {
      reportsCompanyEmployee(date, "Relatório de Gastos por Funcionário")
        .then(() => {})
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setOpenModal((openModal) => !openModal);
        });
    } else if (row?.id === 3) {
      reportsCompanyEmployeeWithAbsences(
        date,
        "Relatório de Gastos por Funcionário (com Faltas)"
      )
        .then(() => {})
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setOpenModal((openModal) => !openModal);
        });
    }
  }, [date, row?.id]);

  return (
    <>
      <Layout pageTitle="Relatórios">
        <div className="mt-2">
          <DataTable
            hiddenFields={["id"]}
            data={data}
            totalPages={10}
            page={1}
            onRelatorioClick={(row) => {
              setRow(row);
              setOpenModal(true);
            }}
          />
        </div>
      </Layout>
      <ModalBase
        title="Selecione a data"
        actionButton="Gerar"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSend={() => handleImprimirRelatorio()}
      >
        <p className="text-base mb-6">
          <div className="mb-3">
            <input
              onChange={(v) => setDate(v.target.value)}
              type="date"
              className="w-full px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </p>
      </ModalBase>
    </>
  );
}
