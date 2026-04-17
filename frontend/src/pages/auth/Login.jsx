import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter the password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setIsLoading(false);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response) {
        setError(error.response.data.message || "Server error");
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError("Request failed");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome!</h3>
      <p className="text-xs text-slate-700 mt-1.5 mb-6">
        Please enter your details to login
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="john@example.com"
          className="border p-2 rounded"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Min 8 Characters"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          {isLoading && <SpinnerLoader />} Login
        </button>
        <p className="text-[12px] text-slate-800 mt-3">
          Don't have an account?{}{" "}
          <button
            type="button"
            className="font-medium text-green-600 underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
