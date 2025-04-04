import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Timer } from 'lucide-react';
import TimerNav from '../components/TimerNav';
import { Helmet } from 'react-helmet';

function Timer5() {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const totalTime = useRef(5 * 60);
  
  useEffect(() => {
    document.title = "5-Minute Timer | Quick Tasks & Mini-Breaks Made Simple";
    return () => {
      document.title = "sense of time";
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (timeLeft === 0) {
      resetTimer();
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime.current);
    setProgress(100);
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          setProgress((newTime / totalTime.current) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>5-Minute Timer | Quick Tasks & Mini-Breaks Made Simple</title>
        <meta name="description" content="A visual 5-minute timer for quick tasks, mini-breaks, or kickstarting productivity. Track time effortlessly and stay motivated with progress you can see." />
        <link rel="canonical" href="https://senseoftime.online/5-minute-timer" />
      </Helmet>
      <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Timer className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
              <span className="text-xl font-medium text-gray-900 dark:text-white">Sense Of Time</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-6xl font-semibold text-gray-900 dark:text-white mb-6">
            5 Minute Timer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Keep time visible, stay in the zone. A visual timer that makes time tangible, helping you focus deeply. Tuck it in a corner of your screen or keep it handy on your phone as your focus sidekick.
          </p>
        </div>

        <div className="flex justify-center mb-24">
          <div className="timer-card bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 flex flex-col items-center">
            <div className="relative w-[240px] h-[240px] flex items-center justify-center">
              <svg className="absolute w-full h-full -rotate-90 transform">
                <circle
                  cx="120"
                  cy="120"
                  r={radius}
                  stroke="#F3F4F6"
                  strokeWidth="32"
                  fill="none"
                  className="dark:stroke-gray-700"
                />
                <circle
                  cx="120"
                  cy="120"
                  r={radius}
                  stroke="#818CF8"
                  strokeWidth="32"
                  fill="none"
                  strokeLinecap="round"
                  className="dark:stroke-indigo-500"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: strokeDashoffset,
                  }}
                />
              </svg>
            </div>

            <div className="text-center mt-8 flex flex-col items-center">
              <div className="text-7xl md:text-5xl text-gray-900 dark:text-white tracking-wider mb-8 tabular-nums" style={{ 
                fontFamily: 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif',
                fontWeight: '500'
              }}>
                {formatTime(timeLeft)}
              </div>
              
              {isRunning ? (
                <button
                  onClick={resetTimer}
                  className="w-32 h-16 rounded-full flex items-center justify-center transition-all duration-300 bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <RotateCcw className="w-8 h-8" />
                </button>
              ) : (
                <button
                  onClick={toggleTimer}
                  className="w-32 h-16 rounded-full flex items-center justify-center transition-all duration-300 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  {timeLeft === 0 ? (
                    <RotateCcw className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <TimerNav currentDuration={5} />

        <section className="max-w-4xl mx-auto px-8 mb-40">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-12 text-center">
            How does a visual timer improve focus
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
              <p>A visual timer helps you stay aware of time while keeping you focused and on track.</p>
              <p>Perfect for neurodivergent thinkers — set your ideal sprint length, break big tasks into bite-sized steps, and work without feeling overwhelmed.</p>
              
            </div>

            <p className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              How to get the most from your 5 minutes
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              5 minutes is perfect for stretching, clearing your head, or prepping for what's next — no pressure, just a smooth warm-up.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Get a head start on something you've put off</span>
              </li>
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Move around or stretch to refresh your body</span>
              </li>
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Jot down ideas or sketch out a quick plan</span>
              </li>
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Clean up a small area without losing focus</span>
              </li>
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Tackle one tiny task (like replying to a message)</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-base font-normal">&copy; {new Date().getFullYear()} Sense Of Time. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Timer5;