import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Calendar, HelpCircle, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

const jobsData = [
  {
    id: 'GIIR2AD013B8',
    title: 'Front End/React JS Developer (Offline Drive)',
    location: 'Hyderabad',
    salary: '₹2.5L',
    openings: 2,
    date: '5 Apr 25, 10:00 AM',
    status: 'open',
    eligibility: '3+ years of React experience'
  },
  {
    id: 'TwB01729525',
    title: 'Web Developer',
    location: 'Kerala',
    salary: '₹2.5L - ₹4L',
    openings: 1,
    date: '5 Apr 25, 10:30 AM',
    status: 'open',
    eligibility: 'HTML, CSS, JavaScript proficiency'
  },
  {
    id: 'e9A56503A381',
    title: 'Software Development Engineer in Testing(QA Interns)',
    location: 'Bengaluru',
    salary: '₹8L',
    openings: 3,
    date: '5 Apr 25, 02:30 PM',
    status: 'open',
    eligibility: 'Testing knowledge, programming basics'
  },
  {
    id: 'PREV123456',
    title: 'Backend Developer',
    location: 'Remote',
    salary: '₹5L',
    openings: 0,
    date: '1 Mar 25, 09:00 AM',
    status: 'previous',
    eligibility: 'Node.js, MongoDB experience'
  }
];

const JobCard = ({ job, onCheckEligibility }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow ">
      <div className="mb-2">
        <div className="text-gray-500 text-xs sm:text-sm mb-1">{job.id}</div>
        <h3 className="text-base sm:text-lg font-semibold mb-2">{job.title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <MapPin size={14} className="text-gray-400 min-w-[14px]" />
            <span className="text-gray-600 text-sm sm:text-base">{job.location}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock size={14} className="text-gray-400 min-w-[14px]" />
            <span className="text-gray-600 text-sm sm:text-base">{job.salary}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Users size={14} className="text-gray-400 min-w-[14px]" />
            <span className="text-gray-600 text-sm sm:text-base">{job.openings} opening{job.openings !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Calendar size={14} className="text-gray-400 min-w-[14px]" />
            <span className="text-gray-600 text-sm sm:text-base">{job.date}</span>
          </div>
        </div>
        {expanded && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">Eligibility Criteria:</h4>
            <p className="text-gray-600 text-sm sm:text-base">{job.eligibility}</p>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button 
          className="text-[#0F52BA] text-xs sm:text-sm flex items-center gap-1"
          onClick={() => {
            onCheckEligibility(job);
            setExpanded(!expanded);
          }}
        >
          {expanded ? 'Hide Details' : 'Check Eligibility'} 
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [showHelp, setShowHelp] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredJobs = jobsData.filter(job => {
    switch (activeTab) {
      case 'open':
        return job.status === 'open';
      case 'applied':
        return false; 
      case 'hiring':
        return false; 
      case 'previous':
        return job.status === 'previous';
      default:
        return true;
    }
  });

  const handleCheckEligibility = (job) => {
    console.log(`Checking eligibility for job: ${job.title}`);
  };

  const handleApplyForJobs = () => {
    setActiveTab('open');
  };

  const tabs = [
    { id: 'open', label: 'Open To Apply' },
    { id: 'applied', label: 'Applied' },
    { id: 'hiring', label: 'Hiring Done' },
    { id: 'previous', label: 'Previous Jobs' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto ">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="mb-4 sm:mb-6">
            <div className="mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Jobs</h2>
            </div>
            
            <div className="flex gap-2 sm:gap-4 border-b mb-4 sm:mb-6 overflow-x-auto pb-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`pb-2 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-sm ${
                    activeTab === tab.id 
                      ? 'text-[#0F52BA] border-b-2 border-[#0F52BA] font-medium' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 sm:space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    onCheckEligibility={handleCheckEligibility}
                  />
                ))
              ) : (
                <div className="text-center py-6 sm:py-8">
                  {activeTab === 'applied' ? (
                    <div className="flex flex-col items-center">
                      <Briefcase size={isMobile ? 36 : 48} className="text-gray-300 mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                        You haven't applied for any jobs yet
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4 max-w-md mx-auto">
                        Browse open positions and apply for jobs that match your skills
                      </p>
                      <button
                        onClick={handleApplyForJobs}
                        className="bg-[#0F52BA] text-white px-4 sm:px-6 py-1 sm:py-2 rounded-md hover:bg-[#0d469d] transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <Briefcase size={14} />
                        Apply for Jobs
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm sm:text-base">
                      No jobs found in this category
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button 
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-[#0F52BA] text-white px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-[#0d469d] transition-colors text-sm sm:text-base z-10"
        onClick={() => setShowHelp(!showHelp)}
      >
        <HelpCircle size={isMobile ? 16 : 20} />
        <span className="hidden sm:inline">Help</span>
      </button>

      {showHelp && (
        <div className={`fixed ${isMobile ? 'bottom-16 right-4' : 'bottom-20 right-6'} bg-white p-3 sm:p-4 rounded-lg shadow-xl max-w-xs sm:max-w-sm z-10`}>
          <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Need help with jobs?</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            Browse open positions, check eligibility criteria, and apply for jobs that match your skills.
          </p>
          <button 
            className="text-[#0F52BA] text-xs sm:text-sm"
            onClick={() => setShowHelp(false)}
          >
            Got it, thanks!
          </button>
        </div>
      )}
    </div>
  );
};

export default App;