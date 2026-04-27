import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { ENV } from '../config/env';

const generateToken = (id: string): string => {
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN as any // O 'as any' resolve a chatice do TS com o formato da string
  });
};

// POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id.toString());
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error: any) {
    if (error.code === 11000)
      res.status(400).json({ message: 'Email já cadastrado' });
    else
      res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: 'Credenciais inválidas' });
      return;
    }

    const token = generateToken(user._id.toString());
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};