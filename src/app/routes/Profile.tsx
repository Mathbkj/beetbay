import {parseFormData, type FileUpload} from "@remix-run/form-data-parser";
import type { Route } from "../routes/+types/Profile";
import { Uploader } from "@/components/Uploader";
import { getUserFromServer } from "@/storage/getUserFromServer";
import { IUser } from "@/types/IUser";

export async function loader({ request }: Route.LoaderArgs) {
  const data: IUser = getUserFromServer(request);
  return { user: data };
}

export async function clientAction({ request }: Route.ClientActionArgs) {


  const uploadHandler = async(fileUpload:FileUpload)=>{
    if(fileUpload.fieldName === "pfp" && fileUpload.type.startsWith("image/")){    
      const response = await fetch("http://localhost:3000/api/update-pfp",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:fileUpload
      })
  }
}

  const formData = await parseFormData(request,uploadHandler);

  const newEmail = formData.get("new_email");

  return {newEmail,}
  
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return <Uploader email={user.email} hash_pass="" exp={0} iat={0} />;
}
