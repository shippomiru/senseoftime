import { Link } from 'react-router-dom';

export default function TimerNav({ currentDuration }: { currentDuration: number }) {
  const durations = [5, 10, 15, 20, 30];
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {durations.map(duration => (
        <Link
          key={duration}
          to={`/${duration}-minute-timer`}
          className={`px-6 py-3 rounded-full transition-all duration-300 ${
            duration === currentDuration
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {duration} Minutes
        </Link>
      ))}
    </div>
  );
}