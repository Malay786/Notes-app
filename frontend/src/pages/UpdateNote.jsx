import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const UpdateNote = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/get/${id}`);
        setForm({ title: res.data.note.title, content: res.data.note.content });
      } catch (error) {
        setError("Failed to fetch note");
      }
    };

    fetchNote();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.content) {
      setError("Both fields are required");
      return;
    }

    try {
      await API.put(`/notes/update/${id}`, form);
      navigate("/"); // redirect to home after update
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update note");
    }
  };

  return (
    <div className="p-3 bg-gray-200">
      <Navbar/>
      <div className="min-h-screen flex justify-center items-center">
        <div className="shadow-lg rounded-md bg-white">
          <div className="p-4">
            <h1 className="text-center text-3xl text-blue-600 font-semibold">
              Update a Note
            </h1>
            <form onSubmit={handleUpdate} className="mt-4">
              <input
                type="text"
                name="title"
                value={form.title}
                placeholder="Title"
                onChange={handleChange}
                className="focus:outline-none border-[1.33px] p-2 border-blue-200 w-full rounded-md"
              />
              <textarea
                type="text"
                name="content"
                value={form.content}
                placeholder="Note goes here.."
                onChange={handleChange}
                className="focus:outline-none border-[1.33px] p-2 border-blue-200 w-full rounded-md mt-2 h-30 resize-none"
              />
              <button
                type="submit"
                className="px-2 py-2 w-1/2 block mx-auto bg-gray-400 mt-2 rounded-md text-xl cursor-pointer hover:bg-gray-500"
              >
                Update
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
