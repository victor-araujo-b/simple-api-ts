interface UserData {
  id: string;
  name: string;
  email: string;
}

interface DashboardProps {
  user: UserData;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Minha Dashboard</h1>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h2 className="text-blue-800 font-semibold text-lg mb-2">Bem-vindo, {user.name}! 👋</h2>
          <p className="text-blue-600">E-mail logado: <strong>{user.email}</strong></p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
            <span className="text-sm text-gray-500 block">Status da Conta</span>
            <span className="text-green-600 font-medium text-sm">🟢 Autenticada via JWT</span>
          </div>
        </div>
      </div>
    </div>
  );
}