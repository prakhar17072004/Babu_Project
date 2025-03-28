import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export const verifyToken = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied, No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    (req as any).user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};