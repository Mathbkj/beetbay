import { IAPIResponse } from "@/types/IAPIResponse";

export async function getSongs(request: Request) {
  const jwtToken = request.headers
    .get("cookie")
    ?.split("jwt_token=")[1]
    .split("sidebar_state=false")[0]
    .split(";")[0];

  const response = await fetch(`http://localhost:3000/api/top-songs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const data: IAPIResponse = await response.json();
  return data.songs;
}
