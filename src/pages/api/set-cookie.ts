import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key, value } = req.body;

  if (!value) {
    return res.status(400).json({ error: "Token is required" });
  }

  if (!key) {
    return res.status(400).json({ error: "Key is required" });
  }

  res.setHeader(
    "Set-Cookie",
    `${key}=${value}; Path=/; HttpOnly; Max-Age=86400`
  );
  res.status(200).json({ message: "Cookie set successfully" });
}
