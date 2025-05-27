import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: "Key is required" });
  }

  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(400).json({ error: "No cookies found" });
  }

  const cookieValue = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith(`${key}=`))
    ?.split("=")[1];

  if (!cookieValue) {
    return res.status(404).json({ error: "Cookie not found" });
  }

  res.status(200).json({ value: cookieValue });
}
