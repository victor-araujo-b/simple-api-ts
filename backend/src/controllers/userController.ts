import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middlewares/authMiddleware';

// GET /api/users — listar todos (admin)
export const getUsers = async (_req: AuthRequest, res: Response): Promise<void> => {
  const users = await User.find().select('-__v');
  res.json({ count: users.length, data: users });
};

// GET /api/users/me — perfil do usuário logado
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.userId);
  res.json(user);
};

// PUT /api/users/me — atualizar perfil
export const updateMe = async (req: AuthRequest, res: Response): Promise<void> => {
  const allowed = { name: req.body.name }; // campos permitidos
  const user = await User.findByIdAndUpdate(req.userId, allowed, {
    new: true, runValidators: true
  });
  res.json(user);
};

// DELETE /api/users/me — deletar conta
export const deleteMe = async (req: AuthRequest, res: Response): Promise<void> => {
  await User.findByIdAndDelete(req.userId);
  res.status(204).send();
};