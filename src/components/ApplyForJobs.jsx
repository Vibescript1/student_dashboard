import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  X, 
  Bookmark, 
  Clock, 
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Code
} from 'lucide-react';

const mockJobs = [
  {
    id: 1,
    title: "Software / Web Developer Intern",
    company: "Smart Finance",
    location: "Anna Nagar, Chennai",
    salary: "₹12,000 - ₹25,000 monthly",
    type: "Full Time",
    experience: "Any experience",
    skills: "HTML, CSS, JavaScript, React",
    workMode: "Work from Office",
    isUrgent: true,
    isNew: true,
    postedDate: "2023-05-15"
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Bangalore, Karnataka",
    salary: "₹20,000 - ₹35,000 monthly",
    type: "Part Time",
    experience: "1-2 years",
    skills: "React, JavaScript, CSS",
    workMode: "Remote",
    isUrgent: false,
    isNew: false,
    postedDate: "2023-05-10"
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Data Systems Ltd",
    location: "Hyderabad, Telangana",
    salary: "₹25,000 - ₹40,000 monthly",
    type: "Full Time",
    experience: "2-3 years",
    skills: "Node.js, MongoDB, Express",
    workMode: "Hybrid",
    isUrgent: true,
    isNew: false,
    postedDate: "2023-05-14"
  }
];

function ApplyForJobs() {
  const [searchRole, setSearchRole] = useState('');
  const [searchExperience, setSearchExperience] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [datePosted, setDatePosted] = useState('All');
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let results = [...jobs];

    if (searchRole) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchRole.toLowerCase()) ||
        job.company.toLowerCase().includes(searchRole.toLowerCase())
      );
    }

    if (searchExperience) {
      results = results.filter(job => 
        job.experience.toLowerCase().includes(searchExperience.toLowerCase())
      );
    }

    if (searchLocation) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    const now = new Date();
    if (datePosted !== 'All') {
      const days = datePosted === 'Last 24 hours' ? 1 : 
                  datePosted === 'Last 3 days' ? 3 : 7;
      
      results = results.filter(job => {
        const jobDate = new Date(job.postedDate);
        const diffTime = Math.abs(now - jobDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays <= days;
      });
    }

    if (urgentOnly) {
      results = results.filter(job => job.isUrgent);
    }
    
    setFilteredJobs(results);
  }, [jobs, searchRole, searchExperience, searchLocation, datePosted, urgentOnly]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filterToRemove) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  const clearAllFilters = () => {
    setSearchRole('');
    setSearchExperience('');
    setSearchLocation('');
    setActiveFilters([]);
    setDatePosted('All');
    setUrgentOnly(false);
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
  };

  const handleApplyNow = () => {
    alert(`Applying for ${selectedJob.title} at ${selectedJob.company}`);
  };

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-100 ">
        <div className=" mx-auto">
          <button 
            onClick={handleBackToList}
            className="flex items-center gap-1 text-blue-600 mb-2 hover:text-blue-800"
          >
            <ChevronLeft size={20} />
            <span>Back to jobs</span>
          </button>

          {/* Job details card */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-600">{selectedJob.company}</span>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold">{selectedJob.title}</h1>
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">• Applied</span>
                </div>
              </div>
              <button 
                onClick={() => toggleSaveJob(selectedJob.id)}
                className={`p-2 rounded-full ${savedJobs.includes(selectedJob.id) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
                <Bookmark size={24} fill={savedJobs.includes(selectedJob.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="text-blue-500" size={20} />
                <div>
                  <div className="text-sm text-gray-600">SALARY</div>
                  <div className="font-medium">{selectedJob.salary}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-blue-500" size={20} />
                <div>
                  <div className="text-sm text-gray-600">EXPERIENCE</div>
                  <div className="font-medium">{selectedJob.experience}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-blue-500" size={20} />
                <div>
                  <div className="text-sm text-gray-600">POSTED</div>
                  <div className="font-medium">{getDaysAgo(selectedJob.postedDate)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-blue-500" size={20} />
                <div>
                  <div className="text-sm text-gray-600">WORK MODE</div>
                  <div className="font-medium">{selectedJob.workMode}</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar size={20} />
                Job Updates
              </h2>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <button className="text-gray-400">
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex-1 px-8">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Applied</span>
                      <span>Expected Date for the Next Update</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>1 minute ago</span>
                      <span>24 Apr, 2025</span>
                    </div>
                  </div>
                  <button className="text-gray-400">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="col-span-2">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code size={20} />
                  Job Description
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>We are looking for a skilled {selectedJob.title} to join our team at {selectedJob.company}.</p>
                  <p>Location: {selectedJob.location}</p>
                  <p>Job Type: {selectedJob.type}</p>
                  <p>Required Skills: {selectedJob.skills}</p>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-4">Job Location</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <MapPin size={16} />
                    <span>{selectedJob.location}</span>
                  </div>

                  <h3 className="font-medium mb-4">Skills Required</h3>
                  <ul className="space-y-2 text-gray-600">
                    {selectedJob.skills.split(',').map((skill, index) => (
                      <li key={index}>• {skill.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Apply Now button */}
            <div className="flex justify-end">
              <button 
                onClick={handleApplyNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors text-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="bg-white p-4 shadow-sm border border-gray-200 ">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Job title, keywords, or company"
            />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchExperience}
              onChange={(e) => setSearchExperience(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Experience level"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Location"
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Search jobs
          </button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-white p-4 border-r">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Experience</h3>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
              <div className="space-y-2">
                <input 
                  type="text"
                  value={searchExperience}
                  onChange={(e) => {
                    setSearchExperience(e.target.value);
                    if (e.target.value) addFilter(e.target.value);
                  }}
                  className="w-full px-3 py-1 border rounded-md text-sm"
                  placeholder="Filter by experience"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Date posted</h3>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
              <div className="space-y-2">
                {['All', 'Last 24 hours', 'Last 3 days', 'Last 7 days'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="date" 
                      checked={datePosted === option}
                      onChange={() => setDatePosted(option)}
                      className="accent-blue-600" 
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Urgently hiring</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={urgentOnly}
                    onChange={() => setUrgentOnly(!urgentOnly)}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm text-gray-600">
                Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} based on your filter
              </span>
            </div>
            {(activeFilters.length > 0 || searchRole || searchLocation || datePosted !== 'All' || urgentOnly) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Filters ({activeFilters.length + 
                  (searchRole ? 1 : 0) + 
                  (searchLocation ? 1 : 0) + 
                  (datePosted !== 'All' ? 1 : 0) + 
                  (urgentOnly ? 1 : 0)})</span>
                
                {searchRole && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {searchRole}
                    <button 
                      onClick={() => setSearchRole('')}
                      className="text-blue-800 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {searchLocation && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {searchLocation}
                    <button 
                      onClick={() => setSearchLocation('')}
                      className="text-blue-800 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {activeFilters.map(filter => (
                  <span key={filter} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {filter}
                    <button 
                      onClick={() => removeFilter(filter)}
                      className="text-blue-800 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                
                {datePosted !== 'All' && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {datePosted}
                    <button 
                      onClick={() => setDatePosted('All')}
                      className="text-blue-800 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {urgentOnly && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    Urgent
                    <button 
                      onClick={() => setUrgentOnly(false)}
                      className="text-blue-800 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                <button 
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-700">No jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleJobClick(job)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {job.isUrgent && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            🔥 Urgently hiring
                          </span>
                        )}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {getDaysAgo(job.postedDate)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-1 text-gray-800">{job.title}</h3>
                      <p className="text-gray-600 mb-3">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} className="text-gray-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase size={16} className="text-gray-500" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{job.workMode}</span>
                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{job.type}</span>
                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{job.experience}</span>
                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{job.skills}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {job.isNew && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveJob(job.id);
                        }}
                        className={`p-2 rounded-full ${savedJobs.includes(job.id) ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600'}`}
                        aria-label={savedJobs.includes(job.id) ? "Unsave job" : "Save job"}
                      >
                        <Bookmark size={18} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ApplyForJobs;