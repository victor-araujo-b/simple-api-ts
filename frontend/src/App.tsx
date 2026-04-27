import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Dashboard } from './components/Dashboard';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  // 1. Função de Logout (precisa estar acima do useEffect se for usada nele)
  const handleLogout = () => {
    localStorage.removeItem('@App:token');
    setUser(null);
  };

  // 2. useEffect corrigido
  useEffect(() => {
    // Movemos a função para dentro para o React saber que ela não mudará
    const fetchUserData = async (token: string) => {
      try {
        const res = await axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch {
        handleLogout();
      }
    };

    const token = localStorage.getItem('@App:token');
    if (token) {
      fetchUserData(token);
    }
  }, []); // Agora o array vazio não reclama, pois a função está interna

  // 3. handleAuth corrigido (sem o 'any' genérico)
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const route = isLogin ? 'login' : 'register';
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const { data } = await axios.post(`http://localhost:3000/api/auth/${route}`, body);
      localStorage.setItem('@App:token', data.token);
      setUser(data.user);
    } catch (err) {

      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || 'Erro na operação');
    }
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Cadastro'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded focus:ring-blue-500 outline-none" 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded focus:ring-blue-500 outline-none" 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded focus:ring-blue-500 outline-none" 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="w-full mt-4 text-sm text-blue-500 hover:underline"
        >
          {isLogin ? 'Ainda não tem conta? Cadastre-se' : 'Já tem conta? Faça Login'}
        </button>
      </div>
    </div>
  );
}

export default App;