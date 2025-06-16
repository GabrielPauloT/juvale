"use client";

import { DataTable } from "@/components/DataTable";
import { Layout } from "@/components/Layout";
import { ModalBase } from "@/components/ModalBase";
import { Toast } from "@/components/Toast";
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
  const [loading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");

  const [toast, setToast] = useState<
    { type: "success" | "error"; message: string } | undefined
  >();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ type, message });
  };

  const data: Data[] = useMemo(
    () => [
      {
        id: 1,
        name: "Relatório de Gastos por Empresa - Mensal",
      },
      {
        id: 2,
        name: "Relatório de Gastos por Funcionário - Mensal",
      },
      {
        id: 3,
        name: "Relatório de Gastos por Funcionário (com Faltas) - Mensal",
      },
    ],
    []
  );

  const handleImprimirRelatorio = useCallback(() => {
    if (row?.id === 1) {
      setIsLoading(true);
      reportsCompany(date, "Relatório de Gastos por Empresa")
        .then(() => {
          showToast("Relatório gerado com sucesso", "success");
        })
        .catch(() => {
          showToast("Erro ao gerar relatório", "error");
        })
        .finally(() => {
          setOpenModal((openModal) => !openModal);
          setIsLoading(false);
        });
    } else if (row?.id === 2) {
      setIsLoading(true);
      reportsCompanyEmployee(date, "Relatório de Gastos por Funcionário")
        .then(() => {
          showToast("Relatório gerado com sucesso", "success");
        })
        .catch(() => {
          showToast("Erro ao gerar relatório", "error");
        })
        .finally(() => {
          setOpenModal((openModal) => !openModal);
          setIsLoading(false);
        });
    } else if (row?.id === 3) {
      setIsLoading(true);
      reportsCompanyEmployeeWithAbsences(
        date,
        "Relatório de Gastos por Funcionário (com Faltas)"
      )
        .then(() => {
          showToast("Relatório gerado com sucesso", "success");
        })
        .catch(() => {
          showToast("Erro ao gerar relatório", "error");
        })
        .finally(() => {
          setOpenModal((openModal) => !openModal);
          setIsLoading(false);
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
        isFetching={loading}
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
      {toast && (
        <Toast type={toast.type} message={toast.message} isClose={setToast} />
      )}
    </>
  );
}
