import React, { useState, useMemo } from 'react';
import { LinkIcon } from './icons/LinkIcon';
import { ContactIcon } from './icons/ContactIcon';

const WhatsAppRequest: React.FC = () => {
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const isContactPickerSupported = useMemo(() => {
    return 'contacts' in navigator && 'select' in (navigator as any).contacts;
  }, []);

  const handleSelectContact = async () => {
    if (!isContactPickerSupported) return;

    try {
      const contacts = await (navigator as any).contacts.select(['name', 'tel'], { multiple: false });
      if (!contacts || contacts.length === 0) {
        return;
      }
      
      const contact = contacts[0];
      if (contact.name && contact.name.length > 0) {
        setContactName(contact.name[0]);
      }
      if (contact.tel && contact.tel.length > 0) {
        // Sanitize phone number to remove non-digit characters
        const sanitizedTel = contact.tel[0].replace(/\D/g, '');
        setPhoneNumber(sanitizedTel);
      }
    } catch (ex) {
      // Log error or handle user cancellation gracefully
      console.error('Error picking contact:', ex);
    }
  };

  const message = useMemo(() => {
    const namePart = contactName.trim() ? ` ${contactName.trim()}` : '';
    return `Hi${namePart}, I hope you're well. I'm doing a digital cleanup and would appreciate it if you could please delete my number from your contacts. Thank you for understanding!`;
  }, [contactName]);

  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;

  const canGenerate = phoneNumber.trim() !== '';

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-1">Send a WhatsApp Request</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Ask a contact to delete your number from their device.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="phone-number" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Contact's Phone Number (with country code)
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., 14155552671"
              className="w-full px-3 py-2 pr-10 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {isContactPickerSupported && (
              <button
                type="button"
                onClick={handleSelectContact}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-purple-500 dark:text-slate-400 dark:hover:text-purple-400 transition-colors"
                aria-label="Select from contacts"
                title="Select from contacts"
              >
                <ContactIcon />
              </button>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Contact's Name (Optional)
          </label>
          <input
            type="text"
            id="contact-name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="e.g., Alex"
            className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Generated Message
          </label>
          <p className="p-3 bg-slate-100/70 dark:bg-slate-900/50 rounded-md text-slate-700 dark:text-slate-300 text-sm">
            {message}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <a
          href={canGenerate ? whatsappLink : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${canGenerate ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed'}`}
          aria-disabled={!canGenerate}
          onClick={(e) => !canGenerate && e.preventDefault()}
        >
          <LinkIcon />
          <span>Open in WhatsApp</span>
        </a>
        {!canGenerate && (
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
            Please enter a phone number to generate the link.
          </p>
        )}
      </div>
    </div>
  );
};

export default WhatsAppRequest;