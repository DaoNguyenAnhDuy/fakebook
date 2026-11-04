// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { hashPassword } from '../../../utils/hash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { email, phone, name, age, address, cccd, password } = req.body;
  if (!email || !phone || !name || !age || !address || !cccd || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, phone, name, age: Number(age), address, cccd, password: hashed },
    });
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
}
