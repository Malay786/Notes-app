import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Navbar from "../components/Navbar";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get("/auth/profile");
      // console.log(res.data.name.split(" "));
      setUserName(res.data.name.split(" ")[0]);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await API.get("/notes/get");
        // console.log(res);
        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching notes: ", error.response?.data?.message);
      }
    };

    fetchNotes();
  }, [navigate]);

  const handleDelete = async (noteId) => {
    try {
      const res = await API.delete(`/notes/delete/${noteId}`);
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.log("Error in handle Delete ", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-5">
      <Navbar />
      <div className="rounded-md shadow-lg">
        <h1 className="text-xl p-4">
          Welcome, <span className="font-mono font-semibold">{userName}</span>
        </h1>

        <div className="flex justify-between items-center mr-4 mt-4 mb-4 p-3">
          <h2 className="text-3xl font-bold font-mono ">Your Notes</h2>
          <Link
            to="/create"
            className="px-2 py-2 border-[1.5px] hover:bg-gray-200 transition-all duration-150 ease-in-out border-gray-600 rounded"
          >
            Create Note
          </Link>
        </div>
        {notes.length === 0 ? (
          <p>No notes found</p>
        ) : (
          <div className="relative grid md:grid-cols-4 sm:grid-cols-1 gap-4 p-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="border-[1px] rounded-md p-4 relative min-h-[150px]"
              >
                <h1 className="text-xl font-semibold mb-2">{note.title}</h1>
                <p className="">{note.content}</p>
                <p
                  className="absolute bottom-2 right-2 text-2xl text-red-400 hover:text-red-600"
                  onClick={() => handleDelete(note._id)}
                >
                  <MdDelete />
                </p>
                <Link
                  to={`/update/${note._id}`}
                  className="absolute bottom-2 right-9 text-xl text-gray-400 hover:text-gray-600"
                >
                  <MdEdit />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
