import { Router } from "express";
import { client } from "../db/index.ts";
import jwt from "jsonwebtoken";
const { JsonWebTokenError } = jwt;
import bcrypt from "bcrypt";
import { getLatestReleases } from "../scraper.ts";

export const router = Router();

router.get("/users", async (_req, res) => {
  const users = await client.from("users").select("*");
  res.status(200).json({ message: "Fetched all the users", users: users.data });
});
router.get("/top-songs", async (req, res) => {
  const bearerToken = req.headers.authorization?.split(" ")[1];
  if (!bearerToken) {
    return res.status(401).json({ message: "Unauthorized access attempt." });
  }
  try {
    const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET!);
    const latestReleases = await getLatestReleases();

    res.status(200).json({
      message: "Fetched latest releases successfully",
      songs: latestReleases,
      auth: decodedToken,
    });
  } catch (err) {
    if (err instanceof JsonWebTokenError)
      return res.status(401).json({ message: "Invalid or expired token." });
  }
});
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(password, salt);

    const existing_user = await client
      .from("users")
      .select("*")
      .eq("email", email);

    if (existing_user.data && existing_user.data.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already in use. Log In instead." });
    }

    await client.from("users").insert({ email: email, hash_pass: hash_pass });

    const token = jwt.sign(
      { email, hash_pass: password },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
    );
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    if (err instanceof Error)
      console.error("Error registering user:", err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return res.status(400).json({
      message:
        "Error loggin in. Make sure your credentials are correct or create a new account.",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, data.hash_pass);
  if (!isPasswordMatch) {
    return res.status(400).json({
      message:
        "Error loggin in. Make sure your credentials are correct or create a new account.",
    });
  }
  const token = jwt.sign(
    { email: data.email, hash_pass: data.hash_pass },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    },
  );
  return res.status(200).json({ message: "Login successful", token });
});
