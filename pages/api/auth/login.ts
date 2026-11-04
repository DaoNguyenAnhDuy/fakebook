// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verifyPassword } from '../../../utils/hash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { identifier, password } = req.body; // identifier can be email or phone
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: identifier }, { phone: identifier }] },
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const match = await verifyPassword(user.password, password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Simple session placeholder – in production use JWT or NextAuth
    res.status(200).json({ message: 'Authenticated', userId: user.id, name: user.name });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
}
