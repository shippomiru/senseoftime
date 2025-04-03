import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, RotateCcw, Timer } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const totalTime = useRef(15 * 60);
  
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

  const handleDoubleClick = useCallback(() => {
    const card = document.querySelector('.timer-card');
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const MM_TO_PX = 3.78;
    const MARGIN_MM = 4;
    const margin = Math.ceil(MARGIN_MM * MM_TO_PX);
    
    const windowLeft = window.screenX;
    const windowTop = window.screenY;
    
    const newWidth = Math.ceil(rect.width + margin * 2);
    const newHeight = Math.ceil(rect.height + margin * 2);
    
    window.resizeTo(newWidth, newHeight);
    window.moveTo(
      windowLeft + (window.outerWidth - newWidth) / 2,
      windowTop + (window.outerHeight - newHeight) / 2
    );
  }, []);

  useEffect(() => {
    document.addEventListener('dblclick', handleDoubleClick);
    return () => document.removeEventListener('dblclick', handleDoubleClick);
  }, [handleDoubleClick]);

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
      <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">Elegant Timer</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
            15 Minute Timer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A simple and elegant timer to help you stay focused and productive. Perfect for time-boxing tasks, taking breaks, or managing your work sessions.
          </p>
        </div>

        <div className="flex justify-center mb-16">
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

        <section className="max-w-4xl mx-auto px-8 mb-32">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Why visual timers help you focus
          </h2>
          <div className="space-y-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              A 30-minute timer is the perfect tool for when you need a solid, distraction-free work session. Whether you're tackling a project, studying, or getting through life admin, half an hour gives you enough time to dive in without losing steam. It's long enough to make real progress but short enough to keep your focus sharp.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
              If you struggle with procrastination or staying on track, a visual countdown helps you stay engaged without constantly checking the clock. Use it to structure your work, balance focus and breaks, and make the most of your time.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              How to use a 30-minute timer effectively:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Knock out a focused work or study session before a well-earned break</span>
              </li>
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Write, brainstorm, or edit with deep concentration</span>
              </li>
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Batch routine tasks, like emails and planning, into one power session</span>
              </li>
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Get through household chores efficiently without feeling like they drag</span>
              </li>
              <li className="flex items-start text-lg text-gray-600 dark:text-gray-300">
                <span className="mr-4 text-indigo-500">•</span>
                <span>Meditate, stretch, or take a mindful break to reset</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Elegant Timer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;