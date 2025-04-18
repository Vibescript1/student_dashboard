import React, { useState } from 'react';
import { MapPin, Clock, Users, Calendar, HelpCircle, Briefcase } from 'lucide-react';

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
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="mb-2">
        <div className="text-gray-500 text-sm mb-1">{job.id}</div>
        <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-gray-600">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span className="text-gray-600">{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <span className="text-gray-600">{job.openings}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-gray-600">{job.date}</span>
          </div>
        </div>
        {expanded && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Eligibility Criteria:</h4>
            <p className="text-gray-600">{job.eligibility}</p>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button 
          className="text-[#0F52BA] text-sm flex items-center gap-1"
          onClick={() => {
            onCheckEligibility(job);
            setExpanded(!expanded);
          }}
        >
          {expanded ? 'Hide Details' : 'Check Eligibility'} 
          <span>{expanded ? '↑' : '→'}</span>
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [showHelp, setShowHelp] = useState(false);

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
      <div className="flex">
        <main className="flex-1 ">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="mb-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Jobs</h2>
              </div>
              <div className="text-gray-600 text-sm mb-4">

              </div>
              
              <div className="flex gap-4 border-b mb-6 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`pb-2 px-2 whitespace-nowrap ${activeTab === tab.id ? 'text-[#0F52BA] border-b-2 border-[#0F52BA]' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      onCheckEligibility={handleCheckEligibility}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    {activeTab === 'applied' ? (
                      <div className="flex flex-col items-center">
                        <Briefcase size={48} className="text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          You haven't applied for any jobs yet
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Browse open positions and apply for jobs that match your skills
                        </p>
                        <button
                          onClick={handleApplyForJobs}
                          className="bg-[#0F52BA] text-white px-6 py-2 rounded-md hover:bg-[#0d469d] transition-colors flex items-center gap-2"
                        >
                          <Briefcase size={16} />
                          Apply for Jobs
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        No jobs found in this category
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <button 
        className="fixed bottom-6 right-6 bg-[#0F52BA] text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-[#0d469d] transition-colors"
        onClick={() => setShowHelp(!showHelp)}
      >
        <HelpCircle size={20} />
        Help
      </button>

      {showHelp && (
        <div className="fixed bottom-20 right-6 bg-white p-4 rounded-lg shadow-xl max-w-xs">
          <h3 className="font-semibold mb-2">Need help with jobs?</h3>
          <p className="text-sm text-gray-600 mb-3">
            Browse open positions, check eligibility criteria, and apply for jobs that match your skills.
          </p>
          <button 
            className="text-[#0F52BA] text-sm"
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