import React, { useState } from 'react';
import {
  Home,
  Briefcase,
  FileText,
  Video,
  ChevronRight,
  ChevronDown,
  FilePlus,
  Linkedin,
  Sparkles,
  MessageCircle,
  PanelRightClose,
  Search,
  Filter,
  MapPin,
  Building2,
  DollarSign,
  ExternalLink,
  Plus,
  LayoutGrid,
  TrendingUp,
  LogOut,
  Award,
  Handshake,
  BarChart3,
  BrainCircuit,
  Laptop,
  Code,
  Users,
  Phone,
  Bell,
  Settings
} from 'lucide-react';

// --- Types ---

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  badge?: string;
  onClick?: () => void;
}

interface StepProps {
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  posted: string;
  salary?: string;
  added?: string;
  description?: string;
  selected?: boolean;
}

interface InterviewScenario {
    id: number;
    title: string;
    description: string;
    duration: string;
}

// --- Data ---

const JOBS_DATA: Job[] = [
  {
    id: 1,
    title: "UKG Pro Senior Consultant",
    company: "Rsm Us Llp.",
    location: "Atlanta, GA",
    posted: "3d ago",
    salary: "$120k - $150k",
    added: "Jan 12",
    description: "Lead and support UKG Pro HCM solutions. Guide clients through implementations and optimizations. Requires strong communication skills and HR systems background.",
    selected: true
  },
  {
    id: 2,
    title: "In-Home Veterinarian",
    company: "Heartstrings Pet",
    location: "Seattle, WA",
    posted: "3d ago",
    salary: "$90k - $110k",
    selected: false
  },
  {
    id: 3,
    title: "Senior UX Designer",
    company: "Tech Solutions",
    location: "San Francisco, CA",
    posted: "1d ago",
    salary: "$140k - $180k",
    selected: false
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Innovate Inc",
    location: "Austin, TX",
    posted: "2d ago",
    salary: "$130k - $160k",
    selected: false
  }
];

const MOCK_INTERVIEW_DATA: InterviewScenario[] = [
    {
        id: 1,
        title: "Full Stack System Design",
        description: "Design a scalable social media feed architecture handling millions of users.",
        duration: "45 Mins"
    },
    {
        id: 2,
        title: "Frontend Optimization",
        description: "Optimize critical rendering path for an e-commerce dashboard to improve Core Web Vitals.",
        duration: "30 Mins"
    },
    {
        id: 3,
        title: "Behavioral: Conflict",
        description: "Tell me about a time you disagreed with a coworker and how you resolved it.",
        duration: "15 Mins"
    },
    {
        id: 4,
        title: "React State Management",
        description: "Compare Redux, Context API, and Zustand for a complex enterprise application.",
        duration: "25 Mins"
    },
    {
        id: 5,
        title: "Database Schema Design",
        description: "Design the schema for a ride-sharing application like Uber or Lyft.",
        duration: "40 Mins"
    },
    {
        id: 6,
        title: "API Rate Limiting",
        description: "Implement a rate limiter for a public API using Redis and Node.js.",
        duration: "35 Mins"
    }
];

// --- Components ---

const SidebarItem: React.FC<NavItemProps> = ({ icon, label, isActive, hasSubmenu, badge, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-5 py-3.5 mx-3 rounded-full cursor-pointer transition-all duration-300 ${
      isActive
        ? 'bg-[#FF5A36] text-white shadow-[0_0_15px_rgba(255,90,54,0.4)]'
        : 'text-[#A1A1A6] hover:bg-[#2C2C2E] hover:text-white'
    }`}
  >
    <div className="flex items-center gap-3">
      <span className={isActive ? 'text-white' : 'text-[#A1A1A6] group-hover:text-white'}>{icon}</span>
      <span className="text-sm font-medium tracking-wide">{label}</span>
      {badge && (
        <span className={`ml-2 px-2 py-0.5 text-[10px] font-bold rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#2C2C2E] text-[#A1A1A6]'}`}>
          {badge}
        </span>
      )}
    </div>
    {hasSubmenu && <ChevronRight size={16} className="text-[#5d5d61]" />}
  </div>
);

const StepPill: React.FC<StepProps> = ({ label, isActive }) => (
  <div
    className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
      isActive
        ? 'bg-[#1C1C1E] border-[#FF5A36] text-[#FF5A36] shadow-[0_0_15px_rgba(255,90,54,0.2)]'
        : 'bg-[#1C1C1E] border-[#2C2C2E] text-[#5d5d61]'
    }`}
  >
    {label}
  </div>
);

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <div className="flex-1 h-2.5 bg-[#0F0F11] rounded-full overflow-hidden border border-[#2C2C2E]">
        <div
          className="h-full bg-gradient-to-r from-[#FF5A36] to-[#FF8F6B] rounded-full shadow-[0_0_10px_rgba(255,90,54,0.5)]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-[#A1A1A6] text-xs font-bold">{current}/{total}</span>
    </div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'jobs' | 'resume-builder' | 'mock-interviews'>('home');
  const [resumeTab, setResumeTab] = useState<'base' | 'tailored'>('base');
  const [activeTask, setActiveTask] = useState('resume');
  const [selectedJobId, setSelectedJobId] = useState<number>(1);

  const selectedJob = JOBS_DATA.find(j => j.id === selectedJobId) || JOBS_DATA[0];

  const renderHomeContent = () => (
    <div className="max-w-7xl mx-auto px-10 py-12 pb-24">
      {/* Greeting */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Hi, Gaffey</h1>
        <p className="text-[#A1A1A6] text-lg">Here's an impactful action plan for your dream job hunt</p>
      </div>

      {/* Stepper */}
      <div className="flex justify-center items-center mb-12 relative">
        {/* Connecting Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[2px] bg-[#2C2C2E] z-0"></div>
        
        <div className="flex gap-6">
          <StepPill label="Application Materials" isActive={true} />
          <StepPill label="Jobs" />
          <StepPill label="Networking" />
          <StepPill label="Interviews" />
        </div>
      </div>

      {/* Action Card */}
      <div className="flex flex-col lg:flex-row bg-[#1C1C1E] rounded-[32px] border border-[#2C2C2E] overflow-hidden mb-8 min-h-[450px] shadow-2xl">
        {/* Left Sidebar of Card */}
        <div className="w-full lg:w-96 bg-[#161618] border-r border-[#2C2C2E] p-8 flex-shrink-0">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-white text-lg">Your Progress</span>
            <ProgressBar current={1} total={5} />
          </div>

          <div className="space-y-4">
            {/* Task Item 1 */}
            <div 
              className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-l-4 ${
                activeTask === 'resume' 
                ? 'bg-[#FF5A36]/10 border-[#FF5A36]' 
                : 'bg-[#1C1C1E] border-transparent hover:bg-[#252529]'
              }`}
              onClick={() => setActiveTask('resume')}
            >
              <div className={`p-2.5 rounded-full ${activeTask === 'resume' ? 'bg-[#FF5A36] text-white' : 'bg-[#2C2C2E] text-[#A1A1A6]'}`}>
                <FileText size={20} />
              </div>
              <span className={`font-semibold ${activeTask === 'resume' ? 'text-white' : 'text-[#A1A1A6]'}`}>
                Create Base Resume
              </span>
            </div>

            {/* Task Item 2 */}
            <div 
              className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border-l-4 ${
                activeTask === 'linkedin' 
                ? 'bg-[#FF5A36]/10 border-[#FF5A36]' 
                : 'bg-[#1C1C1E] border-transparent hover:bg-[#252529]'
              }`}
              onClick={() => setActiveTask('linkedin')}
            >
              <div className={`p-2.5 rounded-full ${activeTask === 'linkedin' ? 'bg-[#FF5A36] text-white' : 'bg-[#2C2C2E] text-[#A1A1A6]'}`}>
                <Linkedin size={20} />
              </div>
              <span className={`font-semibold ${activeTask === 'linkedin' ? 'text-white' : 'text-[#A1A1A6]'}`}>
                Optimize LinkedIn
              </span>
            </div>
          </div>
        </div>

        {/* Right Details of Card */}
        <div className="flex-1 p-10 relative bg-[#1C1C1E]">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF5A36] rounded-full blur-[150px] opacity-[0.05] pointer-events-none"></div>

            <div className="max-w-2xl relative z-10">
                <div className="inline-block bg-[#FF5A36]/10 text-[#FF5A36] text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider border border-[#FF5A36]/20">
                    Resume & Profile
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                    Create a new resume to get started
                </h2>
                
                <p className="text-[#A1A1A6] text-lg leading-relaxed mb-10 max-w-lg">
                    By creating a comprehensive master document now, you'll be able to quickly tailor your resume to any job.
                </p>

                <button className="flex items-center gap-3 bg-[#FF5A36] hover:bg-[#ff6b4a] text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_4px_20px_rgba(255,90,54,0.4)] active:scale-95">
                    <FilePlus size={20} />
                    Create New Base Resume
                </button>
            </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-[#1C1C1E] rounded-[32px] border border-[#2C2C2E] p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A36]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
         
         <div className="relative z-10 max-w-2xl">
             <h2 className="text-2xl font-bold text-white mb-3">
                You've Taken the First Step — Let's Go Further
             </h2>
             <p className="text-[#A1A1A6] mb-8 text-lg">
                You've already started your journey. Now explore all the AI-powered tools designed to help you land job faster.
             </p>
             <button className="border border-[#2C2C2E] hover:border-[#FF5A36] text-white hover:text-[#FF5A36] font-semibold px-6 py-3 rounded-full transition-all bg-[#252529]">
                 Explore All Features
             </button>
         </div>

         {/* Right Graphic for Banner */}
         <div className="mt-8 md:mt-0 relative h-40 w-40 flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#FF5A36] blur-[60px] opacity-20 rounded-full"></div>
              <div className="w-20 h-20 bg-[#0F0F11] rounded-2xl rotate-12 flex items-center justify-center border border-[#2C2C2E] shadow-2xl relative z-10">
                  <Sparkles size={32} className="text-[#FF5A36]" />
              </div>
         </div>
      </div>
    </div>
  );

  const renderJobsContent = () => (
    <div className="flex flex-col h-full bg-[#0F0F11]">
      <div className="flex-1 flex flex-col px-8 py-8 overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8 flex-shrink-0">
              <h1 className="text-3xl font-bold text-white tracking-tight">Job Board</h1>
              <div className="flex gap-4">
                  <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5d5d61] group-focus-within:text-[#FF5A36] transition-colors" size={20} />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        className="pl-12 pr-6 py-3 bg-[#1C1C1E] border border-[#2C2C2E] rounded-full text-sm text-white focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] w-64 lg:w-96 transition-all"
                      />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#1C1C1E] border border-[#2C2C2E] rounded-full text-sm font-bold text-white hover:border-[#FF5A36] transition-colors">
                      Filter
                      <Filter size={16} />
                  </button>
              </div>
          </div>
    
          {/* Main Grid */}
          <div className="flex gap-8 flex-1 overflow-hidden">
              {/* Left List */}
              <div className="w-4/12 overflow-y-auto pr-2 scrollbar-hide flex flex-col">
                 <div className="mb-4 flex-shrink-0 flex justify-between items-end px-2">
                     <h2 className="font-bold text-white text-lg">Latest Jobs</h2>
                     <p className="text-xs text-[#5d5d61] font-mono">142 results</p>
                 </div>
    
                 <div className="space-y-3 pb-10">
                     {JOBS_DATA.map(job => {
                        const isSelected = selectedJobId === job.id;
                        return (
                         <div 
                            key={job.id} 
                            onClick={() => setSelectedJobId(job.id)}
                            className={`p-5 rounded-[24px] border cursor-pointer transition-all duration-200 group ${
                                isSelected 
                                ? 'border-[#FF5A36] bg-[#1C1C1E] shadow-[0_0_20px_rgba(255,90,54,0.15)]' 
                                : 'border-[#2C2C2E] bg-[#1C1C1E] hover:border-[#5d5d61]'
                            }`}
                         >
                            <div className="flex gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${isSelected ? 'bg-[#FF5A36] border-[#FF5A36] text-white' : 'bg-[#0F0F11] border-[#2C2C2E] text-[#5d5d61]'}`}>
                                    <Building2 size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-bold text-base leading-tight mb-1 truncate ${isSelected ? 'text-[#FF5A36]' : 'text-white'}`}>
                                        {job.title}
                                    </h3>
                                    <div className="flex flex-col gap-1 text-xs text-[#A1A1A6] mb-3">
                                        <span className="font-medium text-white">{job.company}</span>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} />
                                            {job.location}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-[#2C2C2E] pt-3 mt-1">
                                        <span className="text-xs font-mono text-[#5d5d61]">{job.posted}</span>
                                        {job.salary && <span className="text-xs font-bold text-[#4CD964]">{job.salary}</span>}
                                    </div>
                                </div>
                            </div>
                         </div>
                     )})}
                 </div>
              </div>
    
              {/* Right Detail Panel */}
              <div className="w-8/12 flex-1 overflow-hidden flex flex-col bg-[#1C1C1E] rounded-[32px] border border-[#2C2C2E] relative">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A36] rounded-full blur-[120px] opacity-[0.05] pointer-events-none"></div>
                   
                   <div className="h-full overflow-y-auto p-10 relative z-10">
                        {/* Header Section */}
                        <div className="flex gap-6 mb-8 items-start">
                            <div className="w-20 h-20 bg-[#0F0F11] rounded-2xl flex items-center justify-center shrink-0 border border-[#2C2C2E] shadow-lg">
                                <Building2 size={36} className="text-[#FF5A36]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white leading-tight mb-3">
                                    {selectedJob.title}
                                </h2>
                                <div className="flex flex-wrap gap-4 text-sm text-[#A1A1A6] items-center">
                                    <span className="text-white font-semibold flex items-center gap-2 bg-[#2C2C2E] px-3 py-1 rounded-full">
                                        <Building2 size={16} /> {selectedJob.company}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <MapPin size={16} /> {selectedJob.location}
                                    </span>
                                    {selectedJob.salary && (
                                        <span className="flex items-center gap-2 text-[#4CD964] font-bold">
                                            <DollarSign size={16} /> {selectedJob.salary}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-10 pb-8 border-b border-[#2C2C2E]">
                            <button className="bg-[#FF5A36] hover:bg-[#ff6b4a] text-white px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(255,90,54,0.3)] active:scale-95">
                                Apply Now
                                <ExternalLink size={18} />
                            </button>
                            <button className="bg-[#2C2C2E] hover:bg-[#3A3A3E] text-white px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all">
                                <Plus size={18} />
                                Save Job
                            </button>
                        </div>

                        {/* Description */}
                        <div className="space-y-6 text-[#A1A1A6] leading-relaxed">
                            <h3 className="text-white font-bold text-lg">Job Description</h3>
                            {selectedJob.description ? (
                                <p>{selectedJob.description}</p>
                            ) : (
                                <div className="space-y-4">
                                    <p>The ideal candidate will guide clients through implementations and optimizations, ensuring a successful execution of the solutions.</p>
                                    <p>They will conduct discovery sessions, configure modules, and provide critical post-go-live support. The role requires strong communication skills and a solid background in HR systems and workforce management.</p>
                                    <p>This position offers a competitive salary range and bonus potential.</p>
                                </div>
                            )}
                            
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="bg-[#0F0F11] p-4 rounded-2xl border border-[#2C2C2E]">
                                    <h4 className="text-white font-bold text-sm mb-2">Requirements</h4>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        <li>3+ years Experience</li>
                                        <li>React & Node.js</li>
                                        <li>System Design</li>
                                    </ul>
                                </div>
                                <div className="bg-[#0F0F11] p-4 rounded-2xl border border-[#2C2C2E]">
                                    <h4 className="text-white font-bold text-sm mb-2">Benefits</h4>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        <li>Remote First</li>
                                        <li>Health & Dental</li>
                                        <li>Unlimited PTO</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                   </div>
              </div>
          </div>
      </div>
    </div>
  );

  const renderResumeBuilderContent = () => (
    <div className="flex flex-col h-full bg-[#0F0F11] px-10 py-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Resume Builder</h1>
            <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#1C1C1E] border border-[#2C2C2E] text-white rounded-full text-sm font-bold hover:border-[#FF5A36] transition-colors">
                      Filter
                      <Filter size={16} />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#FF5A36] text-white rounded-full text-sm font-bold hover:bg-[#ff6b4a] shadow-lg transition-colors">
                      <Plus size={18} />
                      New Resume
                  </button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#2C2C2E] mb-12">
            <button
                onClick={() => setResumeTab('base')}
                className={`pb-4 text-sm font-bold transition-all border-b-2 ${
                    resumeTab === 'base'
                    ? 'border-[#FF5A36] text-[#FF5A36]'
                    : 'border-transparent text-[#5d5d61] hover:text-white'
                }`}
            >
                Base Resumes
            </button>
            <button
                onClick={() => setResumeTab('tailored')}
                className={`pb-4 text-sm font-bold transition-all border-b-2 ${
                    resumeTab === 'tailored'
                    ? 'border-[#FF5A36] text-[#FF5A36]'
                    : 'border-transparent text-[#5d5d61] hover:text-white'
                }`}
            >
                Tailored Resumes
            </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* New Resume Card */}
            <div className="bg-[#1C1C1E] rounded-[32px] border-2 border-dashed border-[#2C2C2E] flex flex-col items-center justify-center p-10 cursor-pointer hover:border-[#FF5A36] hover:bg-[#252529] transition-all group">
                <div className="w-16 h-16 rounded-full bg-[#2C2C2E] flex items-center justify-center text-[#A1A1A6] mb-4 group-hover:bg-[#FF5A36] group-hover:text-white transition-colors">
                    <Plus size={32} />
                </div>
                <h3 className="text-white font-bold text-lg">Create New</h3>
                <p className="text-[#5d5d61] text-sm">Start from scratch</p>
            </div>

            {/* Existing Resume Mock */}
            <div className="bg-[#1C1C1E] rounded-[32px] border border-[#2C2C2E] p-6 relative group hover:border-[#5d5d61] transition-all cursor-pointer">
                <div className="absolute top-6 right-6">
                     <div className="bg-[#4CD964]/10 text-[#4CD964] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Ready</div>
                </div>
                <div className="w-12 h-12 bg-[#0F0F11] rounded-xl flex items-center justify-center text-[#FF5A36] mb-6 border border-[#2C2C2E]">
                    <FileText size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Software Engineer</h3>
                <p className="text-[#A1A1A6] text-sm mb-6">Last edited 2 days ago</p>
                <div className="w-full h-1 bg-[#2C2C2E] rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-[#FF5A36] rounded-full"></div>
                </div>
                <div className="mt-2 text-right text-xs text-[#5d5d61]">85% Score</div>
            </div>
        </div>
    </div>
  );

  const renderMockInterviewsContent = () => (
    <div className="flex flex-col h-full bg-[#0F0F11] overflow-hidden">
        {/* Top Header Section */}
        <div className="flex items-center justify-between px-10 py-8 bg-[#0F0F11]">
            <h1 className="text-3xl font-bold text-white tracking-tight">Mock Interview</h1>
            <button className="flex items-center gap-2 bg-[#FF5A36] hover:bg-[#ff6b4a] text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg active:scale-95">
                <Plus size={18} />
                Start New Session
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 pb-12">
            {/* Search and Filters */}
            <div className="mb-10">
                <div className="relative mb-6">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5d5d61]" size={20} />
                    <input
                        type="text"
                        placeholder="Search scenarios..."
                        className="w-full pl-14 pr-6 py-4 bg-[#1C1C1E] border border-[#2C2C2E] rounded-full text-sm text-white focus:outline-none focus:border-[#FF5A36] focus:ring-1 focus:ring-[#FF5A36] transition-all"
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    {['All Scenarios', 'Technical', 'Behavioral', 'System Design', 'HR', 'Leadership'].map((tag, i) => (
                        <button key={tag} className={`px-5 py-2.5 rounded-full text-xs font-bold border transition-all ${
                            i === 0 
                            ? 'bg-[#FF5A36] text-white border-[#FF5A36]' 
                            : 'bg-[#1C1C1E] text-[#A1A1A6] border-[#2C2C2E] hover:border-[#FF5A36] hover:text-white'
                        }`}>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MOCK_INTERVIEW_DATA.map((scenario) => (
                    <div key={scenario.id} className="bg-[#1C1C1E] p-6 rounded-[32px] border border-[#2C2C2E] hover:border-[#FF5A36] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full group">
                        <div className="mb-4 flex justify-between items-start">
                            <div className="p-3 bg-[#0F0F11] rounded-2xl text-[#FF5A36] group-hover:bg-[#FF5A36] group-hover:text-white transition-colors">
                                <Laptop size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-[#5d5d61] border border-[#2C2C2E] px-2 py-1 rounded-full uppercase">
                                {scenario.duration}
                            </span>
                        </div>
                        <h3 className="font-bold text-white text-lg mb-2 leading-tight group-hover:text-[#FF5A36] transition-colors">{scenario.title}</h3>
                        <p className="text-sm text-[#A1A1A6] line-clamp-3 mb-6 flex-1 leading-relaxed">
                            {scenario.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-[#2C2C2E] flex items-center justify-between">
                             <span className="text-xs text-[#5d5d61] font-bold flex items-center gap-1">
                                <Users size={12} /> 1.2k attempts
                             </span>
                             <ChevronRight size={16} className="text-[#5d5d61] group-hover:text-[#FF5A36] group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const renderContent = () => {
      switch (activePage) {
          case 'home': return renderHomeContent();
          case 'jobs': return renderJobsContent();
          case 'resume-builder': return renderResumeBuilderContent();
          case 'mock-interviews': return renderMockInterviewsContent();
          default: return renderHomeContent();
      }
  };

  return (
    <div className="flex h-screen bg-[#0F0F11] overflow-hidden font-sans selection:bg-[#FF5A36] selection:text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1C1C1E] border-r border-[#2C2C2E] flex flex-col h-full flex-shrink-0 z-20">
        <div className="h-24 flex items-center px-8 border-b border-[#2C2C2E]">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF5A36] to-[#FF8F6B] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(255,90,54,0.3)]">
              U
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Uhired AI</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-8 space-y-2 scrollbar-hide">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Home" 
            isActive={activePage === 'home'} 
            onClick={() => setActivePage('home')}
          />
          <SidebarItem 
            icon={<Briefcase size={20} />} 
            label="Job Board" 
            isActive={activePage === 'jobs'} 
            onClick={() => setActivePage('jobs')}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Resume Builder" 
            isActive={activePage === 'resume-builder'} 
            onClick={() => setActivePage('resume-builder')}
          />
          <SidebarItem 
            icon={<Video size={20} />} 
            label="Mock Interviews" 
            isActive={activePage === 'mock-interviews'} 
            badge="New"
            onClick={() => setActivePage('mock-interviews')}
          />
        </div>

        {/* User Profile in Sidebar */}
        <div className="p-6 border-t border-[#2C2C2E]">
           <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#2C2C2E] cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center text-xs font-bold text-white border border-[#2C2C2E] group-hover:border-[#FF5A36] transition-colors">
                GW
              </div>
              <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">Gaffey Wang</div>
                  <div className="text-xs text-[#5d5d61] truncate">Free Plan</div>
              </div>
              <Settings size={18} className="text-[#5d5d61] group-hover:text-white" />
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-[#0F0F11]">
        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden relative z-10">
            {renderContent()}
        </div>
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-50">
           <button className="w-14 h-14 bg-[#FF5A36] rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(255,90,54,0.4)] hover:bg-[#ff6b4a] hover:scale-105 transition-all">
              <MessageCircle size={28} fill="currentColor" className="text-white" />
           </button>
        </div>

      </main>
    </div>
  );
}