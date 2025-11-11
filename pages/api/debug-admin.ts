import type { NextApiRequest, NextApiResponse } from 'next';

// Temporary debug endpoint for local development only.
// Returns boolean flags indicating whether ADMIN_* env vars are configured,
// and a safe "match" boolean when posted username/password are compared.
// DO NOT COMMIT this file to production; it's intended for local debugging only.

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Forbidden in production' });
  }

  const configured = {
    adminUserSet: !!process.env.ADMIN_USER,
    adminPassSet: !!process.env.ADMIN_PASS,
    adminJwtSecretSet: !!process.env.ADMIN_JWT_SECRET,
  };

  if (req.method === 'GET') {
    return res.status(200).json({ configured });
  }

  if (req.method === 'POST') {
    const { username, password } = req.body || {};
    const match =
      !!process.env.ADMIN_USER &&
      !!process.env.ADMIN_PASS &&
      String(username) === String(process.env.ADMIN_USER) &&
      String(password) === String(process.env.ADMIN_PASS);
    return res.status(200).json({ configured, match });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
