export function getIsLoggedIn(request: Request) {
  const isLoggedIn = !!request.headers.get("cookie")?.includes("jwt_token");
  return isLoggedIn;
}
