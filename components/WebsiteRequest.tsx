import React, { useState, useMemo, useCallback } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { EmailIcon } from './icons/EmailIcon';

const WebsiteRequest: React.FC = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [websiteEmail, setWebsiteEmail] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const emailBody = useMemo(() => {
    const safeWebsiteName = websiteName.trim() || '[Website/Company Name]';
    const safeUserDetails = userDetails.trim() || '[Your username, email, or other identifying details]';
    
    return `Subject: Data Deletion Request

To Whom It May Concern,

I am writing to formally request the deletion of all personal data associated with my account on ${safeWebsiteName}, pursuant to my rights under applicable data protection regulations (such as GDPR, CCPA, etc.).

My identifying information on your service is as follows:
- ${safeUserDetails}

Please process this request and permanently delete all my personal information from your systems, including any backups, within the legally stipulated timeframe (e.g., 30 days).

Could you please confirm in writing once my data has been completely and permanently erased?

Thank you for your prompt attention to this important matter.

Sincerely,
[Your Name]`;
  }, [websiteName, userDetails]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(emailBody).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [emailBody]);
  
  const canGenerate = websiteName.trim() !== '' && userDetails.trim() !== '' && websiteEmail.trim() !== '';

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">Request Data Deletion from a Website</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Generate a formal email to request data deletion.</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="website-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Website / Company Name
          </label>
          <input
            type="text"
            id="website-name"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            placeholder="e.g., Example Corp"
            className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label htmlFor="user-details" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Your Identifying Details
          </label>
          <input
            type="text"
            id="user-details"
            value={userDetails}
            onChange={(e) => setUserDetails(e.target.value)}
            placeholder="e.g., Email: user@example.com, Username: myuser"
            className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label htmlFor="website-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Website's Contact Email
          </label>
          <input
            type="email"
            id="website-email"
            value={websiteEmail}
            onChange={(e) => setWebsiteEmail(e.target.value)}
            placeholder="e.g., privacy@example.com"
            className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Usually found in the website's Privacy Policy.</p>
        </div>
      </div>
      
      <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Generated Email
          </label>
          <textarea
            readOnly
            value={emailBody}
            className="w-full h-64 p-3 bg-slate-100/70 dark:bg-slate-900/50 rounded-md text-slate-700 dark:text-slate-300 text-sm font-mono border border-slate-200 dark:border-slate-700"
          />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <a 
           href={canGenerate ? `mailto:${websiteEmail}?subject=Data%20Deletion%20Request&body=${encodeURIComponent(emailBody)}` : '#'}
           className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${canGenerate ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' : 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed'}`}
           aria-disabled={!canGenerate}
           onClick={(e) => !canGenerate && e.preventDefault()}
        >
            <EmailIcon />
            <span>Open in Email Client</span>
        </a>
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <CopyIcon />
          <span>{isCopied ? 'Copied!' : 'Copy Email Text'}</span>
        </button>
      </div>
       {!canGenerate && (
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-3">
            Please fill all fields to enable the action buttons.
          </p>
        )}
    </div>
  );
};

export default WebsiteRequest;