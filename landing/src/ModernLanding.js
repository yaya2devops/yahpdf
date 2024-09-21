import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clipboard, Check, Terminal } from 'lucide-react';

const cliOptions = [
  {
    benefit: "Count every word in your document",
    command: "yahpdf your-doc.pdf --word-count",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    )
  },
  {
    benefit: "Identify unique words for precise vocabulary analysis",
    command: "yahpdf your-doc.pdf --unique-words",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    benefit: "Discover the most frequently used words",
    command: "yahpdf your-doc.pdf --common-words 10",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    benefit: "Extract all text for easy editing and analysis",
    command: "yahpdf your-doc.pdf --extract-text",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    benefit: "Visualize word frequency with a word cloud",
    command: "yahpdf your-doc.pdf --word-cloud",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  {
    benefit: "Easily collect all email addresses from your document",
    command: "yahpdf your-doc.pdf --extract-emails",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
];

const OptionCard = ({ benefit, command, icon }) => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="mr-4 text-blue-400">{icon}</div>
        <h3 className="text-xl font-semibold">{benefit}</h3>
      </div>
      <div className="mt-auto">
        <div className="bg-black p-3 rounded flex justify-between items-center">
          <code className="text-green-400">{command}</code>
          <button 
            onClick={copyCommand} 
            className="text-white hover:text-blue-400 transition-colors"
          >
            {copied ? <Check size={20} /> : <Clipboard size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ModernLanding() {
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const videoRef = useRef(null);

  const nextOption = () => {
    setCurrentOptionIndex((prevIndex) => (prevIndex + 1) % cliOptions.length);
  };

  const prevOption = () => {
    setCurrentOptionIndex((prevIndex) => (prevIndex - 1 + cliOptions.length) % cliOptions.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => console.log("Autoplay was prevented:", error));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold">YahPDF</h1>
      </header>

      <main className="flex-grow flex flex-col p-6 md:px-12 lg:px-24 gap-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-5xl font-bold leading-tight">
              Process PDFs.<br />Like a pro.
            </h2>
            <p className="text-xl text-gray-400">
              Count words. Extract text. All from your command line.
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">
              <a href="https://pypi.org/project/yahpdf/">Download Now</a>
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[600px] bg-gray-800 rounded-[40px] overflow-hidden shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-[20px]"></div>
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                poster="/api/placeholder/300/600"
                muted
              >
                <source src="https://yahpdf.s3.eu-north-1.amazonaws.com/yahpdf.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Why it's awesome</h2>
          <div className="flex items-center justify-between">
            <button onClick={prevOption} className="p-2 bg-gray-800 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <div className="w-3/4">
              <OptionCard {...cliOptions[currentOptionIndex]} />
            </div>
            <button onClick={nextOption} className="p-2 bg-gray-800 rounded-full">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to supercharge your PDF workflow?</h2>
          <p className="text-xl text-gray-400 mb-6">Install YahPDF now and start processing PDFs like a pro!</p>
          <div className="bg-gray-800 p-4 rounded-lg inline-block">
            <div className="flex items-center">
              <Terminal size={24} className="text-green-400 mr-2" />
              <code className="text-green-400">pip install yahpdf</code>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 md:px-12 lg:px-24 text-center text-gray-500 max-w-7xl mx-auto w-full">
        © 2024 YahPDF. All rights reserved.
      </footer>
    </div>
  );
}