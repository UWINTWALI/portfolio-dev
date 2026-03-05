import { NextApiRequest, NextApiResponse } from 'next';

// Session history is managed client-side in localStorage.
// This endpoint exists for compatibility and always returns 200.
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ status: 'ok' });
}
