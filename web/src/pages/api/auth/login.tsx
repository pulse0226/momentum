import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;
    console.log("Received login request:", { email, password });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
