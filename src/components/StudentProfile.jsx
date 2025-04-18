import { useState } from 'react';
import { FileText, Upload, X } from "lucide-react";

export default function StudentProfile() {
  const initialStudentDetails = {
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    address: '',
    skills: '',
    whatsapp: ''
  };

  const initialParentDetails = {
    name: '',
    phone: '',
    relation: '',
    email: ''
  };

  const [studentDetails, setStudentDetails] = useState(initialStudentDetails);
  const [parentDetails, setParentDetails] = useState(initialParentDetails);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!studentDetails.name.trim()) newErrors.studentName = 'Name is required';
    if (!studentDetails.email.trim()) newErrors.studentEmail = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(studentDetails.email)) newErrors.studentEmail = 'Email is invalid';
    if (!studentDetails.password) newErrors.studentPassword = 'Password is required';
    if (!studentDetails.phone.trim()) newErrors.studentPhone = 'Phone is required';
    if (!studentDetails.gender) newErrors.studentGender = 'Gender is required';
    if (!studentDetails.address.trim()) newErrors.studentAddress = 'Address is required';
    if (!studentDetails.skills.trim()) newErrors.studentSkills = 'Skills are required';
    if (!studentDetails.whatsapp.trim()) newErrors.studentWhatsapp = 'WhatsApp number is required';
    
    if (!parentDetails.name.trim()) newErrors.parentName = 'Parent name is required';
    if (!parentDetails.phone.trim()) newErrors.parentPhone = 'Parent phone is required';
    if (!parentDetails.relation) newErrors.parentRelation = 'Relation is required';
    if (!parentDetails.email.trim()) newErrors.parentEmail = 'Parent email is required';
    else if (!/^\S+@\S+\.\S+$/.test(parentDetails.email)) newErrors.parentEmail = 'Parent email is invalid';
    
    if (!resumeFile) newErrors.resume = 'Resume is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[`student${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`student${name.charAt(0).toUpperCase() + name.slice(1)}`]: '' }));
    }
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentDetails(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[`parent${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors(prev => ({ ...prev, [`parent${name.charAt(0).toUpperCase() + name.slice(1)}`]: '' }));
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      const previewURL = URL.createObjectURL(file);
      setResumePreview(previewURL);

      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    }
  };

  const resetForm = () => {
    setStudentDetails(initialStudentDetails);
    setParentDetails(initialParentDetails);
    setResumeFile(null);
    setResumePreview(null);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      console.log('Student Details:', studentDetails);
      console.log('Parent Details:', parentDetails);
      console.log('Resume File:', resumeFile);
      alert('Profile updated successfully!');
      resetForm(); 
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Student Basic Details</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold bg-[#0F52BA] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg mb-3 sm:mb-4">
                  Student Details
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={studentDetails.name}
                        onChange={handleStudentChange}
                        className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.studentName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                        placeholder="Enter your name"
                        required
                      />
                      {errors.studentName && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.studentName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={studentDetails.email}
                        onChange={handleStudentChange}
                        className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.studentEmail ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                        placeholder="your.email@example.com"
                        required
                      />
                      {errors.studentEmail && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.studentEmail}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Password *</label>
                      <input
                        type="password"
                        name="password"
                        value={studentDetails.password}
                        onChange={handleStudentChange}
                        className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.studentPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                        placeholder="Enter password"
                        required
                      />
                      {errors.studentPassword && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.studentPassword}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={studentDetails.phone}
                        onChange={handleStudentChange}
                        className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.studentPhone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                        placeholder="+1 (___) ___-____"
                        required
                      />
                      {errors.studentPhone && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.studentPhone}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Gender *</label>
                      <select 
                        name="gender"
                        value={studentDetails.gender}
                        onChange={handleStudentChange}
                        className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.studentGender ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent bg-white text-sm sm:text-base`}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.studentGender && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.studentGender}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={studentDetails.address}
                        onChange={handleStudentChange}
                        className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.studentAddress ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                        placeholder="Your address"
                        required
                      />
                      {errors.studentAddress && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.studentAddress}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Skills *</label>
                      <input
                        type="text"
                        name="skills"
                        value={studentDetails.skills}
                        onChange={handleStudentChange}
                        className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.studentSkills ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                        placeholder="List your skills"
                        required
                      />
                      {errors.studentSkills && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.studentSkills}</p>}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">WhatsApp No. *</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={studentDetails.whatsapp}
                        onChange={handleStudentChange}
                        className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.studentWhatsapp ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                        placeholder="_------------"
                        required
                      />
                      {errors.studentWhatsapp && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.studentWhatsapp}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <h3 className="text-base sm:text-lg font-semibold bg-[#0F52BA] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg mb-3 sm:mb-4">
                Parent Details *
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={parentDetails.name}
                      onChange={handleParentChange}
                      className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.parentName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                      placeholder="Parent's name"
                      required
                    />
                    {errors.parentName && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.parentName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone/WhatsApp No. *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={parentDetails.phone}
                      onChange={handleParentChange}
                      className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.parentPhone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                      placeholder="________________"
                      required
                    />
                    {errors.parentPhone && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.parentPhone}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Relation *</label>
                    <select
                      name="relation"
                      value={parentDetails.relation}
                      onChange={handleParentChange}
                      className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.parentRelation ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent bg-white text-sm sm:text-base`}
                      required
                    >
                      <option value="">Select relation</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                    </select>
                    {errors.parentRelation && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.parentRelation}</p>}
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={parentDetails.email}
                      onChange={handleParentChange}
                      className={`w-full px-3 sm:px-4 py-1 sm:py-2 rounded-lg border ${errors.parentEmail ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0F52BA] focus:border-transparent text-sm sm:text-base`}
                      placeholder="parent.email@example.com"
                      required
                    />
                    {errors.parentEmail && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.parentEmail}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-end">
              <button 
                type="submit"
                className="px-6 sm:px-8 py-2 sm:py-3 bg-[#0F52BA] text-white rounded-full hover:bg-[#1565C0] transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Resume Uploader/Preview Resume *</h2>
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[700px] border-2 border-dashed border-blue-200 rounded-xl bg-blue-50 p-4 sm:p-6">
            {resumePreview ? (
              <div className="w-full h-full flex flex-col items-center">
                <div className="relative w-full flex-1 mb-3 sm:mb-4">
                  <iframe 
                    src={resumePreview} 
                    className="w-full h-full min-h-[300px] border border-gray-200"
                    title="Resume Preview"
                  />
                </div>
                <div className="flex items-center">
                  <FileText size={20} className="text-[#0F52BA] mr-2" />
                  <p className="text-gray-600 text-sm sm:text-base">{resumeFile.name}</p>
                </div>
                <button 
                  onClick={() => {
                    setResumeFile(null);
                    setResumePreview(null);
                  }}
                  className="mt-3 text-red-500 text-xs sm:text-sm hover:text-red-700 flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Remove Resume
                </button>
              </div>
            ) : (
              <>
                <FileText size={60} className="text-[#0F52BA] mb-4 sm:mb-6" />
                <p className="text-gray-600 mb-4 sm:mb-6 text-center max-w-md text-sm sm:text-base">Upload resume for autofill the inputs</p>
                <label className="px-6 sm:px-8 py-2 sm:py-3 bg-white border-2 border-[#0F52BA] text-[#0F52BA] rounded-full hover:bg-blue-50 transition-colors font-medium shadow-sm flex items-center mb-3 cursor-pointer text-sm sm:text-base">
                  <Upload size={16} className="mr-2" />
                  Upload Resume
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    required
                  />
                </label>
                {errors.resume && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.resume}</p>}
                <p className="text-gray-500 text-xs sm:text-sm">or drag and drop</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}