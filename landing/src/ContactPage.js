import React from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

const ContactPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-6 md:px-12 lg:px-24">
        <button onClick={onBack} className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft size={24} className="mr-2" />
          Back to Home
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:px-12 lg:px-24">
        <div className="max-w-3xl w-full bg-gray-800 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            For inquiries regarding YahPDF's capabilities, potential collaborations, or to discuss how our innovative PDF processing solutions can be tailored to your specific requirements, please reach out to our development team.
          </p>
          <div className="flex items-center justify-center space-x-4 text-xl md:text-2xl">
            <Mail className="text-blue-400" size={32} />
            <a href="mailto:dev@yahya-abulhaj.dev" className="hover:text-blue-400 transition-colors">
              dev@yahya-abulhaj.dev
            </a>
          </div>
          <p className="mt-8 text-center text-gray-400">
            We appreciate your interest in advancing document processing technology and look forward to exploring potential synergies.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;