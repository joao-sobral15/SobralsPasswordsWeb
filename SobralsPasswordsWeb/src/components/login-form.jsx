import { useState } from "react";
import logo from "../assets/logo.png";
import bg from "../assets/background_login.png";
import axios from "axios";
import { createLoginRequest } from "../types/auth";
import Swal from "sweetalert2";

export default function LoginForm() {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // ✅ CORRIGIDO

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.username) {
      newErrors.username = "Username é obrigatório";
    }

    if (!form.password) {
      newErrors.password = "Password é obrigatória";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = createLoginRequest(form.username, form.password);

    setLoading(true); // ✅ INICIA LOADING

    try {
      const response = await axios.post("/api/user/iniciar-sessao", payload);

      const data = response.data;

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Login efetuado",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        // 👉 aqui depois podes fazer redirect
        // navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: data.message,
        });
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao comunicar com o servidor",
      });

      console.error(err);
    } finally {
      setLoading(false); // ✅ TERMINA LOADING
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 mx-4">

        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="Logo" className="w-80 mb-4" />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* USERNAME */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled={loading} // ✅ opcional UX
              className={`w-full px-4 py-2.5 rounded-lg border 
                ${errors.username ? "border-red-500" : "border-gray-300"}
                focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-2.5 rounded-lg border 
                ${errors.password ? "border-red-500" : "border-gray-300"}
                focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-2.5 rounded-lg shadow-md transition flex items-center justify-center gap-2
              ${loading
                ? "bg-teal-300 cursor-not-allowed"
                : "bg-teal-400 hover:bg-teal-500 text-white"}
            `}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "A entrar..." : "Sign In"}
          </button>

        </form>

      </div>
    </div>
  );
}