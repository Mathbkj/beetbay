import { IUser } from "@/types/IUser";

export function getUserFromServer(request: Request): IUser {
  const jwtToken = request.headers
    .get("cookie")
    ?.split("jwt_token=")[1]
    .split("sidebar_state=false")[0]
    .split(";")[0];

  const userInfo = JSON.parse(atob(jwtToken!.split(".")[1]));

  return userInfo;
}
