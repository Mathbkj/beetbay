import { createContext } from "react";
import { IAuthContext } from "../types/IAuthContext";

export const AuthContext = createContext<IAuthContext>({user:null,login:async()=>{},logout:()=>{}});