import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Terminal, Play, Pause, Volume2, VolumeX, ArrowRight, FileText, Calculator, BarChart2, FileInput, Menu } from 'lucide-react';

// Custom Button component
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "a" : "button"
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        variant === 'default' ? 'bg-primary text-primary-foreground hover:bg-primary/90' :
        variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' :
        variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' :
        variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' :
        variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' :
        variant === 'link' ? 'text-primary underline-offset-4 hover:underline' : ''
      } ${
        size === 'default' ? 'h-10 px-4 py-2' :
        size === 'sm' ? 'h-9 rounded-md px-3' :
        size === 'lg' ? 'h-11 rounded-md px-8' :
        size === 'icon' ? 'h-10 w-10' : ''
      } ${className}`}
      ref={ref}
      {...props}
    />
  )
})

// Custom Card components
const Card = ({ className, ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
)

const CardContent = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)

// Custom Tabs components
const Tabs = ({ defaultValue, className, ...props }) => (
  <div className={className} {...props} />
)

const TabsList = ({ className, ...props }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`} {...props} />
)

const TabsTrigger = ({ className, ...props }) => (
  <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`} {...props} />
)

const TabsContent = ({ className, ...props }) => (
  <div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`} {...props} />
)

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8">
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="16" fill="url(#logo-gradient)"/>
    <path d="M6 6h20v20H6z" fill="#1e293b"/>
    <path d="M10 10h12v12H10z" fill="url(#logo-gradient)"/>
    <path d="M14 14h4v4h-4z" fill="#1e293b"/>
    <path d="M19 19l-3-3 3-3 3 3z" fill="#1e293b"/>
  </svg>
);

const features = [
  {
    title: "Extract Text",
    description: "Easily extract all text from your PDF documents",
    icon: (
      <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
        <FileText size={40} className="text-white" />
      </div>
    )
  },
  {
    title: "Word Count",
    description: "Get accurate word counts for your documents",
    icon: (
      <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
        <Calculator size={40} className="text-white" />
      </div>
    )
  },
  {
    title: "PDF Analysis",
    description: "Get valuable insights from your PDF documents",
    icon: (
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
        <BarChart2 size={40} className="text-white" />
      </div>
    )
  },
  {
    title: "Form Data Extraction",
    description: "Extract form data from PDF documents",
    icon: (
      <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <FileInput size={40} className="text-white" />
      </div>
    )
  }
];

const benefits = [
  {
    title: "Effortless PDF Analysis",
    description: "Quickly extract valuable insights from your PDF documents without manual effort.",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Time-Saving Automation",
    description: "Automate repetitive tasks and focus on what matters most in your workflow.",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Data-Driven Decisions",
    description: "Make informed decisions based on accurate document analytics and visualizations.",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12L12 8M12 8L8 12M12 8V20M4 4H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate YahPDF into your existing command-line workflows and scripts.",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 15L19 19M19 19L15 23M19 19H13M9 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center">
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const BenefitSlide = ({ title, description, icon }) => (
  <div className="text-center p-6">
    <div className="mb-4 text-blue-400 flex justify-center">{icon}</div>
    <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);
const TerminalOutput = ({ content, showExtractedText = false }) => (
  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
    <div className="mb-4 text-blue-400">
      Welcome to YahPDF Command Line Tool
      <br />
      Designed to give you more attention to handling your PDFs.
      <br />
      <br />
      Credited to Yahya Abulhaj
      <br />
      A DevOps Engineer in the Qatari FinTech industry as of this code.
    </div>
    <div className="mb-4">
      Available flags:
      <br />
      --word-count         Get word count
      <br />
      --unique-words       Get unique word count
      <br />
      --common-words N     Get N most common words
      <br />
      --include-stopwords  Include stopwords in analysis
      <br />
      --extract-text       Extract text to file
      <br />
      --word-cloud         Generate word cloud
      <br />
      --extract-emails     Extract email addresses
      <br />
      --sentiment          Analyze sentiment
      <br />
      --json               Output results in JSON format
      <br />
      --pages RANGE        Specify pages to analyze (e.g., '1-5,7,9-12')
    </div>
    {content}
    
    {showExtractedText && (
      <div className="mt-4">
        Text extracted to 'extracted_text.txt'
      </div>
    )}
  </div>
);

export default function ModernLanding() {
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef(null);

  const nextBenefit = () => {
    setCurrentBenefitIndex((prevIndex) => (prevIndex + 1) % benefits.length);
  };

  const prevBenefit = () => {
    setCurrentBenefitIndex((prevIndex) => (prevIndex - 1 + benefits.length) % benefits.length);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsVideoEnded(true);
  };

  const nextDemo = () => {
    setCurrentDemoIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevDemo = () => {
    setCurrentDemoIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => console.log("Autoplay was prevented:", error));
        setIsPlaying(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full sticky top-0 bg-gray-900 z-50">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Logo />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">YahPDF</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
            <a href="#install" className="text-gray-300 hover:text-white transition-colors">Install</a>
          </div>
          <div className="md:hidden">
            <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} variant="ghost">
              <Menu size={24} />
            </Button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="mt-4 flex flex-col space-y-2">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
            <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
            <a href="#install" className="text-gray-300 hover:text-white transition-colors">Install</a>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col p-6 md:px-12 lg:px-24 gap-24 max-w-7xl mx-auto w-full">
        <section className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[calc(100vh-80px)]">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Process PDFs.<br />Like a pro.
            </h2>
            <p className="text-2xl text-gray-400">
              Count words. Extract text. All from your CLI.
            </p>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition duration-300 text-lg px-8 py-4 rounded-full transform hover:scale-105 hover:shadow-lg">
              <a href="https://pypi.org/project/yahpdf/" className="inline-flex items-center">
                <span className="mr-2">⦿</span>
                Use yahPDF Now
                <ArrowRight className="ml-2" size={24} />
              </a>
            </Button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[600px] bg-gray-800 rounded-[40px] overflow-hidden shadow-2xl" style={{boxShadow: '0 20px 50px rgba(255, 255, 255, 0.2)'}}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-b-[20px]"></div>
              <div className="relative w-full h-full">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="/api/placeholder/300/600"
                  loop
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnded}
                >
                  <source src="https://d112cead1p2h4q.cloudfront.net/yahpdf.1.1.0.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                    className="w-full mb-2"
                  />
                  <div className="flex items-center justify-between">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={togglePlayPause}
                      className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black rounded-full transition duration-300"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </Button>
                    {isVideoEnded ? (
                      <span className="text-white text-sm">Great job! Try YahPDF now!</span>
                    ) : (
                      <span className="text-white text-sm">
                        {Math.floor(currentTime)}s / {Math.floor(duration)}s
                      </span>
                    )}
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={toggleMute}
                      className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black rounded-full transition duration-300"
                    >
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-24">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-center">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        <section id="demo" className="mt-24">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-center">See YahPDF in Action</h2>
          <div className="bg-gray-800 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] p-8">
            <div className="overflow-hidden mb-8">
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentDemoIndex * 100}%)` }}>
                <div className="w-full flex-shrink-0">
                  <TerminalOutput content={
                    <>
                      $ yahpdf https://create.ya-ya.tech/isolution/migration.pdf --extract-text
                      <br />
                      Extracting text: 100%|████████████████████████████████████| 1/1
                      <br />
                      Text extracted to 'extracted_text.txt'
                    </>
                  } />
                </div>
                <div className="w-full flex-shrink-0">
                  <TerminalOutput content={
                    <>
                      $ yahpdf https://create.ya-ya.tech/isolution/migration.pdf --word-count
                      <br />
                      Analyzing document: 100%|███████████████████████████████| 1/1
                      <br />
                      Total words: 1234
                      <br />
                      Unique words: 567
                    </>
                  } />
                </div>
                <div className="w-full flex-shrink-0">
                  <TerminalOutput content={
                    <>
                      $ yahpdf https://create.ya-ya.tech/isolution/migration.pdf --word-cloud
                      <br />
                      Generating word cloud: 100%|██████████████████████████| 1/1
                      <br />
                      Word cloud saved to sample_wordcloud.png
                    </>
                  } />
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              {['Extract Text', 'Word Count', 'Word Cloud'].map((label, index) => (
                <button
                  key={label}
                  onClick={() => setCurrentDemoIndex(index)}
                  className={`
                    px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out
                    ${currentDemoIndex === index 
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section id="benefits" className="mt-24">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-center">Why Choose YahPDF?</h2>
          <div className="relative">
            <Button variant="outline" size="icon" onClick={prevBenefit} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-full p-4">
              <ChevronLeft size={32} />
            </Button>
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentBenefitIndex * 100}%)` }}>
                {benefits.map((benefit, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <BenefitSlide {...benefit} />
                  </div>
                ))}
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={nextBenefit} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-full p-4">
              <ChevronRight size={32} />
            </Button>
          </div>
        </section>

        <section id="install" className="mt-24 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Ready to supercharge your PDF workflow?</h2>
          <p className="text-xl text-gray-400 mb-8">Install YahPDF now and start processing PDFs like a pro!</p>
          <div className="bg-gray-800 p-4 rounded-lg inline-block">
            <div className="flex items-center">
              <Terminal size={24} className="text-green-400 mr-2" />
              <code className="text-green-400">pip install yahpdf</code>
            </div>
          </div>
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Start Your PDF Revolution</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of developers who have transformed their PDF workflows with YahPDF</p>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition duration-300 text-lg px-8 py-4 rounded-full">
            <a href="https://pypi.org/project/yahpdf/" className="inline-flex items-center">
              Get yahPDF Now
              <ArrowRight className="ml-2" size={24} />
            </a>
          </Button>
        </section>
      </main>

      <footer className="p-6 md:px-12 lg:px-24 text-center text-gray-500 max-w-7xl mx-auto w-full border-t border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-2">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://docs.python.org/3" className="hover:text-white transition-colors">Python</a></li>
              <li><a href="https://pypi.org/project/yahpdf" className="hover:text-white transition-colors">yahPDF</a></li>
              <li><a href="https://yahpdf.s3.eu-north-1.amazonaws.com/yahpdf.1.1.0.mp4" className="hover:text-white transition-colors">Tuto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Intiative</h3>
            <ul className="space-y-2">
              <li><a href="https://merit.ya-ya.tech" className="hover:text-white transition-colors">About</a></li>
              <li><a href="https://github.com/yaya2devops/yahpdf/issues/new?title=Let%27s%20Elevate%20yahPDF%20Together!%20Your%20Expertise%20Matters%20Here%21&body=Hi%20There%2C%0A%0AI%27ve%20created%20yahPDF%20to%20empower%20developers%20like%20you%20to%20work%20seamlessly%20with%20PDFs.%20Together%2C%20we%20can%20make%20this%20tool%20even%20stronger%20by%20adding%20your%20unique%20expertise.%0A%0AThis%20is%20your%20chance%20to%20shape%20the%20future%20of%20YahPDF%21%20%0A%0AGot%20ideas%2C%20improvements%2C%20or%20just%20want%20to%20help%20out%3F%20Share%20your%20feedback%20and%20join%20the%20mission.%0A%0A%5BYaya%20Eagerly%20Awaits%20Your%20Input%5D%0A%0A---%0A###%20Contribution%20Details%0A%E2%9A%A0%20Please%20fill%20out%20this%20section%20with%20your%20awesome%20contribution.%0A*%20Project%20ID%3A%20%5Byour-project-id%5D%0A*%20Feature%20Request%20or%20Improvement%3A%20%5BAdd%20what%20you%20want%20to%20contribute%5D%0A*%20Source%20Code%3A%20%5Byahpdf/src%5D(https://github.com/yaya2devops/yahpdf)%0A*%20GitHub%20Handle%3A%20%40yaya2devops%0A
" className="hover:text-white transition-colors">Contribute</a></li>
              <li><a href="mailto:dev@yahya-abulhaj.dev" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Legal</h3>
            <ul className="space-y-2">
              <li><a href="https://docs.google.com/document/d/1mr9x6DwYphniMpnTDitH6E9htdwG8dJI0Ncd9FFlqoM/edit?usp=sharing" className="hover:text-white transition-colors">Code of Conduct</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <Logo />
          <p>© 2024 YahPDF. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
