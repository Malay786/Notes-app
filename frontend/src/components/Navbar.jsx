import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full bg-gray-400 p-4 rounded">
      <div className="md:flex md:justify-between md:items-center">
        <button 
          className="font-mono cursor-pointer text-2xl text-amber-950"
          onClick={() => navigate('/')}
        >QuickNotes</button>
        <button
          className="border-[1.25px] cursor-pointer px-4 py-2 hover:bg-red-200 rounded-md ml-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
