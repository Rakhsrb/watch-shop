import React, { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Axios from "../../Axios";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { isAuth } = useSelector((state) => state.user);

  if (isAuth) {
    window.location.href = "/";
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await Axios.post("admin/login", {
        password,
        phoneNumber: +phone,
      });

      Cookies.set("token", data.token, { secure: true, expires: 7 });
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="h-screen bg-green-950">
        <div className="container px-4 h-full flex items-center justify-center">
          <form
            className="flex flex-col gap-5 w-full md:w-[500px] bg-green-800 shadow-2xl rounded-xl p-10 relative"
            onSubmit={handleLogin}
          >
            <img
              src="https://cdn.freebiesupply.com/logos/large/2x/rolex-1-logo-black-and-white.png"
              alt=""
              className="w-[150px] mx-auto"
            />
            <div className="flex justify-between border border-white rounded-xl overflow-hidden">
              <button
                type="button"
                className="w-1/6 text-[12px] md:text-lg bg-transparent text-white border-r border-white"
              >
                +998
              </button>
              <input
                type="number"
                className="p-2 outline-none w-5/6 bg-transparent text-white"
                placeholder="Телефонный номер"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="border border-white p-2 w-full rounded-xl bg-transparent text-white"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <EyeSlash size={24} color="#fff" />
                ) : (
                  <Eye size={24} color="#fff" />
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className={`bg-green-600 py-2 text-white rounded-xl ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
