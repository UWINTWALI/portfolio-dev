import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repoUrlRaw = req.query.repoUrl;
  const repoUrl = Array.isArray(repoUrlRaw) ? repoUrlRaw[0] : repoUrlRaw;
  if (!repoUrl) {
    return res
      .status(400)
      .json({ error: 'repoUrl query parameter is required' });
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
    headers.Authorization = 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  } else {
    console.warn(
      'GITHUB_PERSONAL_ACCESS_TOKEN not set; API requests may be rate-limited.'
    );
  }

  // @ts-ignore
  const starsRes = await fetch(String(repoUrl), { headers });
  if (!starsRes.ok) {
    return res.status(200).json(0);
  }
  const projectDetail = await starsRes.json();

  return res.status(200).json({
    stars: projectDetail.stargazers_count,
    html_url: projectDetail.html_url,
  });
}
