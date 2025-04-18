import { useState } from 'react';
import StudentProfile from './StudentProfile';
import SchedulePage from './SchedulePage';
import ApplyForJobs from './ApplyForJobs';
import Jobapplied from './Jobapplied';
import { Home, User, Calendar, Briefcase, MessageCircle, Settings, FileText, Menu } from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#D6E6F2] flex flex-col">

      <header className="md:hidden bg-[#0F52BA] text-white py-3 px-4 flex justify-between items-center shadow-md">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full hover:bg-[#1565C0] transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold">VOAT</h1>
        <button className="p-2 rounded-full hover:bg-[#1565C0] transition-colors">
          <Settings size={20} />
        </button>
      </header>


      <header className="hidden md:flex bg-[#0F52BA] text-white py-4 px-6 justify-between items-center shadow-md">
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

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="absolute inset-0 bg-black/30" 
              onClick={() => setSidebarOpen(false)}
            ></div>
            <aside className="relative z-50 w-72 h-full bg-white shadow-lg flex flex-col">
              <div className="p-4 flex justify-end">
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <MobileSidebarContent 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                setSidebarOpen={setSidebarOpen}
              />
            </aside>
          </div>
        )}

        <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col">
          <DesktopSidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
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

// Extracted sidebar content components for better organization
function DesktopSidebarContent({ activeTab, setActiveTab }) {
  return (
    <>
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
        <SidebarButton 
          icon={<User size={18} className="mr-3" />}
          label="Profile"
          active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        />
        <SidebarButton 
          icon={<Calendar size={18} className="mr-3" />}
          label="Schedule/Organizer"
          active={activeTab === 'schedule'}
          onClick={() => setActiveTab('schedule')}
        />
        <SidebarButton 
          icon={<Briefcase size={18} className="mr-3" />}
          label="Apply for Jobs"
          active={activeTab === 'apply'}
          onClick={() => setActiveTab('apply')}
        />
        <SidebarButton 
          icon={<FileText size={18} className="mr-3" />}
          label="Jobs Applied"
          active={activeTab === 'jobapplied'}
          onClick={() => setActiveTab('jobapplied')}
        />
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
    </>
  );
}

function MobileSidebarContent({ activeTab, setActiveTab, setSidebarOpen }) {
  return (
    <>
      <div className="p-4 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border-4 border-blue-100">
            <User size={48} className="text-[#0F52BA]" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center">Shivam Dubey</h2>
        <p className="text-gray-500 text-xs text-center">Computer Science Student</p>
      </div>

      <nav className="flex-1 overflow-y-auto pb-1 px-1 space-y-1">
        <SidebarButton 
          icon={<User size={18} className="mr-1" />}
          label="Profile"
          active={activeTab === 'profile'}
          onClick={() => {
            setActiveTab('profile');
            setSidebarOpen(false);
          }}
        />
        <SidebarButton 
          icon={<Calendar size={18} className="mr-1" />}
          label="Schedule/Organizer"
          active={activeTab === 'schedule'}
          onClick={() => {
            setActiveTab('schedule');
            setSidebarOpen(false);
          }}
        />
        <SidebarButton 
          icon={<Briefcase size={18} className="mr-1" />}
          label="Apply for Jobs"
          active={activeTab === 'apply'}
          onClick={() => {
            setActiveTab('apply');
            setSidebarOpen(false);
          }}
        />
        <SidebarButton 
          icon={<FileText size={18} className="mr-1" />}
          label="Jobs Applied"
          active={activeTab === 'jobapplied'}
          onClick={() => {
            setActiveTab('jobapplied');
            setSidebarOpen(false);
          }}
        />
      </nav>
    </>
  );
}

function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center ${active ? 'bg-[#0F52BA] text-white' : 'bg-gray-100 text-gray-700'} py-3 px-4 rounded-lg text-left hover:bg-[#1565C0] transition-colors`}
    >
      {icon}
      {label}
    </button>
  );
}