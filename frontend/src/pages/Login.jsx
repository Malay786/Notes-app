import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    try {
        const {data} = await API.post("/auth/login", form);
        localStorage.setItem("token", data.token);
        // console.log(data)
        navigate("/");
    } catch (error) {
        setError(error.response?.data?.message || "Something went Wrong")
        // setForm({email: "", password: ""});
        console.log(error.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="shadow-lg rounded-md bg-white">
        <div className="p-4">
          <h1 className="text-center text-3xl text-blue-600 font-semibold">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter Your Email"
              onChange={handleChange}
              className="focus:outline-none border-[1.33px] p-2 border-blue-200 w-full rounded-md"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter Your Password"
              onChange={handleChange}
              className="focus:outline-none border-[1.33px] p-2 border-blue-200 w-full rounded-md mt-2"
            />
            <button type="submit"
              className="px-2 py-2 w-1/2 block mx-auto bg-blue-500 mt-2 rounded-md text-xl cursor-pointer hover:bg-blue-600"
            >Login</button>
            <p className="mt-2 text-center">New User? <Link to="/signup" className="text-blue-400">Signup</Link></p>
          </form>
          {
            error && <p className="text-red-500">{error}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
