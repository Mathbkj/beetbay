import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/sidebar.tsx", [
    index("./routes/Home.tsx"),
    route("signup", "./routes/Signup.tsx"),
    route("discover", "./routes/Discover.tsx"),
    route("profile", "./routes/Profile.tsx"),
    route("favorites", "./routes/Favorites.tsx"),
  ]),
  route("login", "./routes/Login.tsx"),
];
