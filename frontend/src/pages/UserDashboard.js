import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, Activity, Scale, Ruler, Thermometer, FileText, Target, Zap, ArrowRight, HeartPulse } from 'lucide-react';
import Navbar from '../components/Navbar';

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({ age: '', height: '', weight: '', issue: '', healthCondition: '', preventionGoal: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://wellcare-backend.onrender.com/api/health-stats', { ...formData, userId: user.id, name: user.name });
    alert("Vitals Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">PORTAL_DASHBOARD</h1>
          <button onClick={() => navigate('/care-plan')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest text-xs">
            View My Care Plan <ArrowRight size={18}/>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><HeartPulse size={120} /></div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">Patient Vitals</h3>
              <div className="space-y-4 font-bold">
                <div className="flex justify-between p-5 bg-blue-50 rounded-2xl border border-blue-100 text-blue-600">
                  <span className="flex items-center gap-2"><Scale size={18}/> Weight</span>
                  <span>{formData.weight || '--'} kg</span>
                </div>
                <div className="flex justify-between p-5 bg-indigo-50 rounded-2xl border border-indigo-100 text-indigo-600">
                  <span className="flex items-center gap-2"><Ruler size={18}/> Height</span>
                  <span>{formData.height || '--'} cm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl relative">
              <form onSubmit={handleSubmit} className="space-y-8">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <ClipboardCheck className="text-blue-600" /> Medical Context Update
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                    <input type="number" className="modern-input-v2" placeholder="Years" onChange={e => setFormData({...formData, age: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Body Weight</label>
                    <input type="number" className="modern-input-v2" placeholder="kg" onChange={e => setFormData({...formData, weight: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Height</label>
                    <input type="number" className="modern-input-v2" placeholder="cm" onChange={e => setFormData({...formData, height: e.target.value})} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Concern</label>
                  <input className="modern-input-v2" placeholder="e.g. Chronic back pain" onChange={e => setFormData({...formData, issue: e.target.value})} required />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Medical Description</label>
                  <textarea className="modern-input-v2 h-32 pt-4" placeholder="Describe symptoms..." onChange={e => setFormData({...formData, healthCondition: e.target.value})} required />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prevention Goal</label>
                  <input className="modern-input-v2 bg-blue-50/30" placeholder="e.g. Lose 5kg" onChange={e => setFormData({...formData, preventionGoal: e.target.value})} required />
                </div>

                <button className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-blue-600 transition-all uppercase tracking-widest">
                  Securely Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserDashboard;