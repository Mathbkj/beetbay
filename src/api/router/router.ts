import { Router } from "express";
import { client } from "../db/index.ts";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getLatestReleases } from "../scraper.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
import { getRadioStations } from "../radio.ts";
const { JsonWebTokenError } = jwt;

export const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
router.get("/stations",async(req,res)=>{
  const stations = await getRadioStations();
  res.status(200).json({ message: "Fetched radio stations successfully", stations });
})
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

router.post("/update-pfp", authMiddleware, async (req, res) => {

  console.log(req.body);

  // const uploadResult = await cloudinary.uploader.upload(file.path, {
  //   public_id: "profile_pictures",
  // });

  // const matchingUser = await client
  //   .from("users")
  //   .select("user_id")
  //   .eq("email", email)
  //   .single();

  // if (!matchingUser.data)
  //   return res
  //     .status(404)
  //     .json({ message: "User associated with the profile_picture not found" });

  // await client.from("profile_pictures").upsert({
  //   user_id_fk: matchingUser.data.user_id,
  //   url: uploadResult.secure_url,
  // });

  // return res.status(200).json({
  //   message: "Profile Picture uploaded successfully",
  //   url: uploadResult.secure_url,
  // });
});

router.get("/favorite-songs/:email", async (req, res) => {
  const { email } = req.params;

  const { data, error } = await client
    .from("users")
    .select("favorite_songs")
    .eq("email", email)
    .single();

  if (error)
    return res
      .status(400)
      .json({ message: `Error fetching favorite songs for user ${email}` });
  return res.status(200).json({
    message: "Favorite songs fetched successfully",
    favoriteSongs: data.favorite_songs,
  });
});
router.post("/favorite-songs", async (req, res) => {
  const { email, favoriteSongs } = req.body;

  const { error } = await client
    .from("users")
    .update({ favorite_songs: favoriteSongs })
    .eq("email", email)
    .select()
    .single();
  if (error)
    return res
      .status(400)
      .json({ message: `Error updating favorite songs for user ${email}` });
  return res
    .status(204)
    .json({ message: "Favorite songs updated successfully" });
});

router.patch("/update-mail/:email", async (req, res) => {
  const { email } = req.params;
  const { newEmail } = req.body;

  const existingUser = await client
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!existingUser.data) {
    return res.status(404).json({ message: "User not found" });
  }
  const { data, error } = await client
    .from("users")
    .update({ email: newEmail })
    .eq("email", email)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const newToken = jwt.sign(
    { email: data.email, hash_pass: data.hash_pass },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" },
  );
  return res
    .status(200)
    .json({ message: "Email updated successfully", token: newToken });
});
