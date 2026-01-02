import { Activity, LogOut, User as UserIcon, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white/70 backdrop-blur-xl border-b border-slate-200 px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-slate-800 uppercase">WellCare</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">{user?.name}</p>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">{user?.role}</p>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}