import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN || '7d') as string,
  MONGO_URI: process.env.MONGO_URI as string,
  PORT: process.env.PORT || 3000,
};

// Validação simples para evitar erros em runtime
if (!ENV.JWT_SECRET) {
  throw new Error("ERRO CRÍTICO: JWT_SECRET não definida no .env");
}