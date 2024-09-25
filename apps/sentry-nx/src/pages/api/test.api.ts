import type { NextApiRequest, NextApiResponse } from 'next';

// A faulty API route to test Sentry's error monitoring
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' });
}
