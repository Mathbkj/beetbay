import { IUser } from "@/types/IUser";

export function getUserFromServer(request: Request): IUser {
  const cookie = request.headers.get("cookie");
  if (!cookie || !cookie.includes("jwt_token=")) {
    return { email: "example@example.com", hash_pass: "", iat: 0, exp: 0 };
  }
  let token = "";
  try {
    token = cookie.split("jwt_token=")[1]?.split("sidebar_state=false")[0]?.split(";")[0];
    if (!token) {
      return { email: "example@example.com", hash_pass: "", iat: 0, exp: 0 };
    }
    const payload = token.split(".")[1];
    if (!payload) {
      return { email: "example@example.com", hash_pass: "", iat: 0, exp: 0 };
    }
    const userInfo = JSON.parse(atob(payload));
    return userInfo;
  } catch (e) {
    return { email: "example@example.com", hash_pass: "", iat: 0, exp: 0 };
  }
}
