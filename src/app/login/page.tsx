"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/Icons";
import { useAuth } from "@/service/hooks/AuthQuery";
import Cookies from "js-cookie";
import { Toast } from "@/components/Toast";

export default function LoginPage() {
  const authMutation = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const [toast, setToast] = useState<
    { type: "success" | "error"; message: string } | undefined
  >();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ type, message });
  };

  function validate() {
    const newErrors: typeof errors = {};

    if (!form.email.includes("@")) {
      newErrors.email = "O e-mail deve ser válido.";
    }

    if (!form.email.trim()) {
      newErrors.email = "O campo de e-mail é obrigatório.";
    }

    if (form.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (!form.password.trim()) {
      newErrors.password = "O campo de senha é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin() {
    setError("");

    if (!validate()) return;

    setLoading(true);

    authMutation
      .mutateAsync(
        { email: form.email, password: form.password },
        {
          onError: (err) => {
            setError(err.message || "Erro ao fazer login.");
            setShake(true);
            setLoading(false);
            setTimeout(() => setShake(false), 500);
          },
          onSuccess: () => {
            setLoading(false);
          },
        }
      )
      .then((response) => {
        if (response.data?.accessToken) {
          Cookies.set("auth_token", response.data.accessToken, { expires: 1 });
          router.push("/dashboard");
        }
      })
      .catch(() => {
        setError("Usuário ou senha inválidos.");
        setShake(true);
        setLoading(false);
        setTimeout(() => setShake(false), 500);
        showToast("falha ao realizar login", "success");
      });
  }

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-100 dark:bg-gray-900 px-4">
      <AnimatePresence>
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full max-w-md"
        >
          <motion.div
            key="login-form"
            animate={shake ? { x: [-10, 10, -8, 8, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-8"
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
              Entrar
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="email@exemplo.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.password
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="******"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mb-4 text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? (
                <Icons
                  name="FiLoader"
                  size={24}
                  className="animate-spin inline-block"
                />
              ) : (
                "Entrar"
              )}
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {toast && (
        <Toast type={toast.type} message={toast.message} isClose={setToast} />
      )}
    </div>
  );
}
