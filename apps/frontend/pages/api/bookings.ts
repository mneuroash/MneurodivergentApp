import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const bookings = await prisma.booking.findMany();
    res.status(200).json(bookings);
  } else if (req.method === 'POST') {
    const { userId, date } = req.body;
    const booking = await prisma.booking.create({ data: { userId, date: new Date(date) } });
    res.status(201).json(booking);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}