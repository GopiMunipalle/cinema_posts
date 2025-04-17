import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token not provided" });

  jwt.verify(token, JWT_SECRET, (err: any, token: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    console.log("Token decoded:", token);
    req.user = token;
    next();
  });
}
