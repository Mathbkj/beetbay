import { IProfilePicture } from "@/types/IProfilePicture";
import { createContext } from "react";

export const ProfilePictureContext = createContext<IProfilePicture>({url:"",setUrl:()=>{}});