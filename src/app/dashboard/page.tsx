"use client";

import { Layout } from "@/components/Layout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCompany } from "@/service/hooks/CompanyQuery";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const { data } = useCompany({ date: new Date().toISOString().split("T")[0] });

  const funcionariosData = {
    labels: data?.data.map((item) => item.nameCompany) || [],
    datasets: [
      {
        data: data?.data.map((item) => item.totalFuncionariosAtivos) || [],
        backgroundColor: [
          "rgba(37, 99, 235, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(34, 197, 94, 0.7)",
        ],
        borderColor: [
          "rgba(37, 99, 235, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const valeRefeicaoData = {
    labels: data?.data.map((item) => item.nameCompany) || [],
    datasets: [
      {
        data: data?.data.map((item) => item.totalVR) || data?.data.map(() => 0),
        backgroundColor: [
          "rgba(34, 197, 94, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(168, 85, 247, 0.7)",
        ],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(234, 179, 8, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const valeTransporteData = {
    labels: data?.data.map((item) => item.nameCompany) || [],
    datasets: [
      {
        data: data?.data.map((item) => item.totalVT) || data?.data.map(() => 0),
        backgroundColor: [
          "rgba(168, 85, 247, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(34, 197, 94, 0.7)",
        ],
        borderColor: [
          "rgba(168, 85, 247, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout pageTitle="Dashboard">
      <div className="p-6">
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Funcionários Ativos
              </h2>
              <div className="h-64">
                <Pie
                  data={funcionariosData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: "rgb(156, 163, 175)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Vale Refeição Total
              </h2>
              <div className="h-64">
                <Pie
                  data={valeRefeicaoData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: "rgb(156, 163, 175)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Vale Transporte Total
              </h2>
              <div className="h-64">
                <Pie
                  data={valeTransporteData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          color: "rgb(156, 163, 175)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
