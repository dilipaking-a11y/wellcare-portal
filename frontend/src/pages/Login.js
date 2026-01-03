import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ChevronRight, Activity } from 'lucide-react';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://wellcare-backend.onrender.com/api/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.role === 'specialist') navigate('/specialist');
      else navigate('/dashboard');
    } catch (err) { alert("Access Denied: Invalid Credentials"); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Side: Branding */}
        <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <Activity className="w-8 h-8" />
              <span className="text-2xl font-black uppercase tracking-tighter">WellCare</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight">Better Advice for a <span className="text-blue-200 underline decoration-wavy">Healthier</span> Life.</h1>
            <p className="mt-6 text-blue-100 font-medium">Industry-standard health portal powered by Expert AI analysis.</p>
          </div>
          <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
            <p className="text-sm italic">"The care I received through WellCare changed my lifestyle for the better."</p>
            <p className="mt-2 text-xs font-bold uppercase opacity-60">- Patient Review</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-12">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Enter your credentials to access your portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700" 
                  placeholder="name@company.com"
                  onChange={e => setForm({...form, email: e.target.value})} 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-slate-700" 
                  placeholder="••••••••"
                  onChange={e => setForm({...form, password: e.target.value})} 
                  required
                />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-xl shadow-slate-200">
              Sign Into Dashboard <ChevronRight size={18} />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? <Link to="/register" className="text-blue-600 font-black hover:underline ml-1">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;