import { NextApiRequest, NextApiResponse } from 'next';
// Import edge-config lazily to avoid runtime errors when EDGE_CONFIG isn't set
import { readFile } from 'fs/promises';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.EDGE_CONFIG) {
    // Clear message to help local dev and CI
    const localPath = path.join(process.cwd(), 'data', 'likes.json');
    try {
      const content = await readFile(localPath, 'utf-8');
      const parsed = JSON.parse(content);
      return res.status(200).json({ likes: parsed['portfolio-likes'] ?? 0 });
    } catch (err) {
      return res.status(500).json({
        error:
          'Edge Config connection string (EDGE_CONFIG) is not provided. To work locally, copy `.env.local.example` to `.env.local`, or create a local file data/likes.json with `{ "portfolio-likes": 0 }`.',
      });
    }
  }

  try {
    const { get } = await import('@vercel/edge-config');
    const likes = await get('portfolio-likes');
    return res.status(200).json({ likes });
  } catch (err: any) {
    console.error(
      'Error fetching edge config key `portfolio-likes`:',
      err?.message ?? err
    );
    return res
      .status(500)
      .json({ error: 'Error fetching likes from Edge Config' });
  }
}
