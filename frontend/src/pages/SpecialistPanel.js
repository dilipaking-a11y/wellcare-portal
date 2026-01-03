import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Sparkles, Send, Activity, ShieldAlert, UserCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

function SpecialistPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [advice, setAdvice] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    axios.get('https://wellcare-backend.onrender.com/api/specialist/users').then(res => setUsers(res.data));
  }, []);

  const generateAIAdvice = async () => {
    if (!selectedUser) return;
    setIsThinking(true);
    // Simulate AI analysis delay
    setTimeout(async () => {
      const res = await axios.post('https://wellcare-backend.onrender.com/api/generate-ai-advice', selectedUser);
      setAdvice(res.data.advice);
      setIsThinking(false);
    }, 1500);
  };

  const submitPlan = async () => {
    await axios.post('https://wellcare-backend.onrender.com/api/submit-plan', { userId: selectedUser.userId, advice });
    alert("Care plan finalized and sent.");
    setSelectedUser(null);
    setAdvice("");
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-96 bg-white border-r border-slate-200 flex flex-col p-6 shadow-xl">
          <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter">Patient Inbox</h2>
          <div className="flex-1 overflow-y-auto space-y-3">
            {users.map(u => (
              <button key={u.id} onClick={() => setSelectedUser(u)} className={`w-full p-5 text-left rounded-2xl border transition-all ${selectedUser?.userId === u.userId ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-white border-slate-100 hover:border-blue-400'}`}>
                <p className="font-bold text-lg leading-tight">{u.name}</p>
                <p className="text-[10px] font-black uppercase opacity-40 mt-1">{u.issue}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-10 overflow-y-auto bg-[#f8fafc]">
          {selectedUser ? (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex justify-between items-end shadow-sm">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">{selectedUser.name}</h2>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black uppercase tracking-widest">Vitals Verified</span>
                  </div>
                </div>
                <button onClick={generateAIAdvice} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs">
                  <Sparkles size={18} className={isThinking ? 'animate-spin' : ''}/> {isThinking ? "AI ANALYZING..." : "Run AI Advisor"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 bg-white rounded-[2rem] border border-slate-200">
                  <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"><ShieldAlert size={14}/> Complaint</h4>
                  <p className="text-slate-800 font-bold">{selectedUser.issue}</p>
                </div>
                <div className="p-8 bg-white rounded-[2rem] border border-slate-200">
                  <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2"><UserCheck size={14}/> Goal</h4>
                  <p className="text-slate-800 font-bold">{selectedUser.preventionGoal}</p>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
                <div className="bg-slate-900 px-8 py-4 flex justify-between items-center text-white">
                  <span className="font-bold text-xs uppercase tracking-[0.2em]">Consultation Draft</span>
                  <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded">MOCK AI SYSTEM</span>
                </div>
                <textarea className="w-full p-8 outline-none text-slate-700 leading-relaxed min-h-[400px] text-lg font-medium" value={advice} onChange={(e)=>setAdvice(e.target.value)} placeholder="Advice will appear here..."></textarea>
                <div className="p-8 bg-slate-50 border-t flex justify-end">
                  <button onClick={submitPlan} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-3">
                    <Send size={18}/> Push to Patient
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-200"><Activity size={100} className="animate-pulse"/></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SpecialistPanel;