import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        try {
            const {data} = await API.get("/auth/profile");
            setUser(data);
        } catch (error) {
            setUser(null);
        }
    }
}