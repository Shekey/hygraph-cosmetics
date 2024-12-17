// pages/api/purge-cache.ts

import type { NextApiRequest, NextApiResponse } from "next";

interface PurgeRequestBody {
  path: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { path }: PurgeRequestBody = req.body;

  // Validate the request body
  if (!path) {
    return res.status(400).json({ message: "Path is required" });
  }

  // Cloudflare API credentials from environment variables
  const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
  const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

  if (!CLOUDFLARE_ZONE_ID || !CLOUDFLARE_API_TOKEN) {
    return res
      .status(500)
      .json({ message: "Cloudflare credentials are missing" });
  }

  try {
    // Cloudflare API endpoint
    const url = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`;

    // Request body for Cloudflare API
    const purgeBody = {
      files: [path],
    };

    // Send the request to Cloudflare
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify(purgeBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to purge cache",
        error: data,
      });
    }

    // Success response
    res.status(200).json({ message: "Cache purged successfully", data });
  } catch (error) {
    console.error("Error purging cache:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
