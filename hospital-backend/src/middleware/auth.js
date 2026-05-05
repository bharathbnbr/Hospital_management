import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    // ✅ Extract actual token (remove "Bearer ")
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message); // debug
    res.status(401).json({ msg: "Invalid token" });
  }
};