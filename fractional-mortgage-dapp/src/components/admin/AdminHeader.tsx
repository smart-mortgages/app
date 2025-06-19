import React from 'react';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Admin Dashboard",
  subtitle = "System Management"
}) => {
  return (
    <div className="bg-gradient-to-r from-[#262626] to-[#333333] p-6 border-b border-[#d2b48c]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#e6d2b5]">{title}</h1>
          <p className="text-sm text-[#f5f5f5] opacity-80">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
