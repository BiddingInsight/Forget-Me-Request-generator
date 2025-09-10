import React from 'react';
import { RequestType } from '../types';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { EmailIcon } from './icons/EmailIcon';

interface TabSelectorProps {
  activeTab: RequestType;
  setActiveTab: (tab: RequestType) => void;
}

const TabButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const baseClasses = "flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-purple-500 flex items-center justify-center gap-2";
  const activeClasses = "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg";
  const inactiveClasses = "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-900/50";

  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};


const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex p-1 space-x-1 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-white/50 dark:border-slate-700/50">
      <TabButton 
        label="WhatsApp Contact"
        icon={<WhatsappIcon />}
        isActive={activeTab === RequestType.WHATSAPP}
        onClick={() => setActiveTab(RequestType.WHATSAPP)}
      />
      <TabButton
        label="Website / Service"
        icon={<EmailIcon />}
        isActive={activeTab === RequestType.WEBSITE}
        onClick={() => setActiveTab(RequestType.WEBSITE)}
      />
    </div>
  );
};

export default TabSelector;