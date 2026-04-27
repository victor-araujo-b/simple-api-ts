import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth',  authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/', (_req, res) =>
  res.json({ status: '🟢 API online' })
);

// Inicialização
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
  );
});

export default app;