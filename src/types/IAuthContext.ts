import { User } from "./User";

export interface IAuthContext{
    user:User | null;
    login:(email:string,password:string)=>Promise<void>;
    logout:()=>void;
}