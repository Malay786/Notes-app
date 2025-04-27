import React, { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
        const res = await API.post("/auth/signup", form);
        localStorage.setItem("token", res.data.token);
        navigate("/");  // redirect to Notes
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="shadow-lg rounded-md bg-white">
        <div className="p-4">
          <h1 className="text-center text-3xl text-blue-600 font-semibold">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Enter Your Name"
              onChange={handleChange}
              className="focus:outline-none border-[1.33px] p-2 border-blue-200 w-full rounded-md"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter Your Email"
              onChange={handleChange}
              className="focus:outline-none border-[1.33px] p-2 border-blue-200 w-full rounded-md mt-2"
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
            >Signup</button>
            <p className="mt-2 text-center">Already a User? <Link to="/login" className="text-blue-400">Login</Link></p>
          </form>
          {
            error && <p className="text-red-500">{error}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Register;
