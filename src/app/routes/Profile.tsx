import type { Route } from "../routes/+types/Profile";
import { Uploader } from "@/components/Uploader";
import { getUserFromServer } from "@/storage/getUserFromServer";
import { IUser } from "@/types/IUser";

export async function loader({ request }: Route.LoaderArgs) {
  const data: IUser = getUserFromServer(request);
  return { user: data };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  console.log(formData);

  return { newEmail: formData.get("new_email") };
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return <Uploader email={user.email} hash_pass="" exp={0} iat={0} />;
}
