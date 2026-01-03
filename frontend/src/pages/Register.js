import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Stethoscope, ChevronRight, Activity } from 'lucide-react';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post('https://wellcare-backend.onrender.com/api/register', form);
    alert("Registration successful! Welcome to the portal.");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        <div className="md:w-5/12 bg-indigo-600 p-12 text-white flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-2 mb-10">
                <Activity size={32} />
                <span className="text-2xl font-black uppercase tracking-tighter italic">WellCare AI</span>
              </div>
              <h1 className="text-5xl font-black leading-[1.1] mb-6 tracking-tight text-white">Join the Next Generation of <span className="text-indigo-200">Health.</span></h1>
              <p className="text-indigo-100 font-medium">Create your profile and get 1-on-1 expert medical advice powered by AI specialists.</p>
           </div>
           <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20">
              <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-50">Portal Benefits</p>
              <ul className="text-sm space-y-2 font-bold text-indigo-50">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300"></div> AI-Driven Care Plans</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300"></div> 24/7 Specialist Access</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300"></div> Encrypted Health Records</li>
              </ul>
           </div>
        </div>

        <div className="md:w-7/12 p-16">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Create Account</h2>
            <p className="text-slate-500 mt-2 font-medium">Choose your role and start your journey.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-300" size={18} />
                  <input className="modern-input-v2 pl-12" placeholder="John Doe" onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
               </div>
               <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Role</label>
                <div className="relative">
                  <Stethoscope className="absolute left-4 top-4 text-slate-300" size={18} />
                  <select className="modern-input-v2 pl-12 appearance-none" onChange={e => setForm({...form, role: e.target.value})}>
                    <option value="user">Patient Portal</option>
                    <option value="specialist">Specialist Panel</option>
                  </select>
                </div>
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-300" size={18} />
                <input className="modern-input-v2 pl-12" type="email" placeholder="john@wellcare.com" onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
                <input className="modern-input-v2 pl-12" type="password" placeholder="••••••••" onChange={e => setForm({...form, password: e.target.value})} required />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest mt-8">
              Complete Registration <ChevronRight size={20} />
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 font-medium">
            Already a member? <Link to="/" className="text-indigo-600 font-black hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;