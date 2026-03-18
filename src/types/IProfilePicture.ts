import { Dispatch, SetStateAction } from "react";

export interface IProfilePicture {
    url:string;
    setUrl:Dispatch<SetStateAction<string>>;
}