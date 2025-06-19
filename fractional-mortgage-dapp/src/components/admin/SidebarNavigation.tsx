import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { NavItem } from '../../types/admin';


interface SidebarNavigationProps {
  navItems: NavItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  navItems,
  activeSection,
  setActiveSection
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-full bg-[#262626] border-r border-[#404040] flex flex-col">
      <div className="p-4 border-b border-[#404040]">
        <h2 className="text-xl font-bold text-[#e6d2b5]">Admin Panel</h2>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeSection === item.id ? 'bg-[#333333] text-[#e6d2b5]' : 'text-[#f5f5f5] hover:bg-[#2a2a2a]'}`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Bottom section with user dashboard link */}
      <div className="p-4 border-t border-[#404040]">
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full flex items-center justify-center space-x-2 bg-[#d2b48c] text-[#1a1a1a] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c19a6b] transition-colors shadow-md"
        >
          <span>User Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SidebarNavigation;
