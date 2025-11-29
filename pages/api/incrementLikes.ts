import { NextApiRequest, NextApiResponse } from 'next';
// Import edge-config lazily inside the handler to avoid initialization errors when env not set
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  // Require an ADMIN_EMAIL env var to restrict who can increment likes
  const allowedAdminEmail = process.env.ADMIN_EMAIL;
  const userRole = session.user?.role;
  if (
    allowedAdminEmail &&
    session.user?.email !== allowedAdminEmail &&
    userRole !== 'admin'
  ) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const isEdgeConfigured = !!process.env.EDGE_CONFIG;
  // If we plan to update Edge Config (via REST API) ensure tokens are present
  const willUseVercelApi = !!process.env.EDGE_CONFIG_TOKEN;
  if (willUseVercelApi && !process.env.VERCEL_TOKEN) {
    return res.status(500).json({
      message:
        'VERCEL_TOKEN is required to update Edge Config items via Vercel REST API.',
    });
  }
  let currentLikes = 0;
  if (isEdgeConfigured) {
    const { get } = await import('@vercel/edge-config');
    currentLikes = (await get('portfolio-likes')) as number;
  }
  // If edge-config isn't available in local dev, try reading from a local file as fallback
  if (!isEdgeConfigured) {
    try {
      const localPath = path.join(process.cwd(), 'data', 'likes.json');
      const content = await readFile(localPath, 'utf-8');
      const parsed = JSON.parse(content);
      currentLikes = parsed['portfolio-likes'] ?? 0;
    } catch (err) {
      // default to 0 if file doesn't exist
      currentLikes = 0;
    }
  }
  const likeIncrements = parseInt(req.query.increment as string);

  if (likeIncrements < 0 || likeIncrements > 9) {
    return res.status(200);
  }

  if (!currentLikes || !likeIncrements) {
    return res.status(400).json({
      message: 'Error fetching or updating likes',
    });
  }

  const updatedLikes = currentLikes + likeIncrements;
  // @ts-ignore
  try {
    if (willUseVercelApi) {
      const updateEdgeConfig = await fetch(
        `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_TOKEN}/items`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [
              {
                operation: 'update',
                key: 'portfolio-likes',
                value: updatedLikes,
              },
            ],
          }),
        }
      );
      const data = await updateEdgeConfig.json();
      if (!updateEdgeConfig.ok) {
        return res.status(500).json(data);
      }
      return res.status(200).json(data);
    } else {
      const localPath = path.join(process.cwd(), 'data', 'likes.json');
      await writeFile(
        localPath,
        JSON.stringify({ 'portfolio-likes': updatedLikes }, null, 2),
        'utf-8'
      );
      return res
        .status(200)
        .json({ likes: updatedLikes, source: 'local-file' });
    }
  } catch (err: any) {
    console.error('Error updating edge-config items:', err?.message ?? err);
    // Last ditch attempt: if edge-config fails and we are in local, write to local file
    if (!process.env.EDGE_CONFIG) {
      try {
        const localPath = path.join(process.cwd(), 'data', 'likes.json');
        await writeFile(
          localPath,
          JSON.stringify({ 'portfolio-likes': updatedLikes }, null, 2),
          'utf-8'
        );
        return res
          .status(200)
          .json({ likes: updatedLikes, source: 'local-file' });
      } catch (writeErr) {
        console.error('Error writing fallback likes file:', writeErr);
      }
    }
    return res
      .status(500)
      .json({ message: 'Unable to update Edge Config items.' });
  }
}
