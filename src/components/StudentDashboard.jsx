import { useState } from 'react';
import StudentProfile from './StudentProfile';
import SchedulePage from './SchedulePage';
import ApplyForJobs from './ApplyForJobs';
import Jobapplied from './Jobapplied';
import { Home, User, Calendar, Briefcase, MessageCircle, Settings, FileText } from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-[#D6E6F2] flex flex-col">
      <header className="bg-[#0F52BA] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2 bg-[#0D47A1] rounded-full px-4 py-2 hover:bg-[#1565C0] transition-colors cursor-pointer">
          <Home size={20} />
          <span className="font-medium">HOME</span>
        </div>
        <div className="flex items-center justify-center flex-1">
          <h1 className="text-2xl font-bold">VOAT</h1>
        </div>
        <button className="p-2 bg-[#0D47A1] rounded-full hover:bg-[#1565C0] transition-colors">
          <Settings size={20} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
 
        <aside className="w-full md:w-64 bg-white shadow-lg flex flex-col">
          <div className="p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border-4 border-blue-100">
                <User size={64} className="text-[#0F52BA]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center">Shivam Dubey</h2>
            <p className="text-gray-500 text-sm text-center">Computer Science Student</p>
          </div>

          <nav className="flex-1 overflow-y-auto pb-6 px-4 space-y-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center ${activeTab === 'profile' ? 'bg-[#0F52BA] text-white' : 'bg-gray-100 text-gray-700'} py-3 px-4 rounded-lg text-left hover:bg-[#1565C0] transition-colors`}
            >
              <User size={18} className="mr-3" />
              Profile
            </button>



            <button 
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center ${activeTab === 'schedule' ? 'bg-[#0F52BA] text-white' : 'bg-gray-100 text-gray-700'} py-3 px-4 rounded-lg text-left hover:bg-[#1565C0] transition-colors`}
            >
              <Calendar size={18} className="mr-3" />
              Schedule/Organizer
            </button>
            <button 
              onClick={() => setActiveTab('apply')}
              className={`w-full flex items-center ${activeTab === 'apply' ? 'bg-[#0F52BA] text-white' : 'bg-gray-100 text-gray-700'} py-3 px-4 rounded-lg text-left hover:bg-[#1565C0] transition-colors`}
            >
              <Briefcase size={18} className="mr-3" />
              Apply for Jobs
            </button>
            <button
            onClick={() => setActiveTab('jobapplied')}
            className={`w-full flex items-center ${activeTab === 'jobapplied' ? 'bg-[#0F52BA] text-white' : 'bg-gray-100 text-gray-700'} py-3 px-4 rounded-lg text-left hover:bg-[#1565C0] transition-colors`}>            <FileText size={18} className="mr-3" />
              Jobs Applied
            </button>
          </nav>


          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-center space-x-4">
              <button className="p-2 text-[#0F52BA] hover:bg-blue-50 rounded-full transition-colors">
                <MessageCircle size={18} />
              </button>
              <button className="p-2 text-[#0F52BA] hover:bg-blue-50 rounded-full transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </aside>

 
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-[#F5F9FD]">
          {activeTab === 'profile' && <StudentProfile />}
          {activeTab === 'schedule' && <SchedulePage />}
          {activeTab === 'apply' && <ApplyForJobs />}
          {activeTab === 'jobapplied' && <Jobapplied />}
        </main>
      </div>
    </div>
  );
}