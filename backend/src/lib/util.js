import jwt from "jsonwebtoken";

 const generateToken = (dataset, res) => {
  const token = jwt.sign(dataset, process.env.JWT_SECRET, { expiresIn: "1d" });

  console.log("Generated Token:", token); // Debugging

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // Prevents JavaScript access (more secure)
    sameSite: "strict", // Prevents CSRF attacks
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production (HTTPS only)
  });

  return token; // Optional, but useful if needed
};

export default generateToken