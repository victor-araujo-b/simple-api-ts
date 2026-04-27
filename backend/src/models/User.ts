import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface = "formato" do documento
export interface IUser extends Document {
  name:      string;
  email:     string;
  password:  string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type:     String,
    required: [true, 'Nome é obrigatório'],
    trim:     true
  },
  email: {
    type:     String,
    required: [true, 'Email é obrigatório'],
    unique:   true,
    lowercase: true
  },
  password: {
    type:     String,
    required: [true, 'Senha é obrigatória'],
    minlength: 6,
    select:   false // nunca retorna o hash nas queries
  }
}, { timestamps: true });

// Hook: faz hash da senha antes de salvar
userSchema.pre<IUser>('save', async function (this: IUser) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Método de instância: compara senha
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUser>('User', userSchema);