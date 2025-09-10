import React, { useState } from 'react';
import { RequestType } from './types';
import Header from './components/Header';
import TabSelector from './components/TabSelector';
import WhatsAppRequest from './components/WhatsAppRequest';
import WebsiteRequest from './components/WebsiteRequest';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RequestType>(RequestType.WHATSAPP);

  return (
    <div className="min-h-screen font-sans text-slate-900 dark:text-slate-100 antialiased">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Header />
        <main>
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-6">
            {activeTab === RequestType.WHATSAPP ? <WhatsAppRequest /> : <WebsiteRequest />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;