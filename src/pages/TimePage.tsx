import { useState, useEffect } from 'react';
import { formatTimezoneOffset, getUserTimezone } from '../utils/dateUtils';

export function TimePage() {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 100);
    return () => clearInterval(timer);
  }, []);

  const timezone = getUserTimezone();
  const timezoneOffset = formatTimezoneOffset();
  
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');
  
  // World clocks
  const worldClocks = [
    { city: 'Москва', tz: 'Europe/Moscow', flag: '🇷🇺' },
    { city: 'Лондон', tz: 'Europe/London', flag: '🇬🇧' },
    { city: 'Нью-Йорк', tz: 'America/New_York', flag: '🇺🇸' },
    { city: 'Токио', tz: 'Asia/Tokyo', flag: '🇯🇵' },
    { city: 'Пекин', tz: 'Asia/Shanghai', flag: '🇨🇳' },
    { city: 'Дубай', tz: 'Asia/Dubai', flag: '🇦🇪' },
    { city: 'Берлин', tz: 'Europe/Berlin', flag: '🇩🇪' },
    { city: 'Париж', tz: 'Europe/Paris', flag: '🇫🇷' },
    { city: 'Сидней', tz: 'Australia/Sydney', flag: '🇦🇺' },
    { city: 'Калининград', tz: 'Europe/Kaliningrad', flag: '🇷🇺' },
    { city: 'Екатеринбург', tz: 'Asia/Yekaterinburg', flag: '🇷🇺' },
    { city: 'Владивосток', tz: 'Asia/Vladivostok', flag: '🇷🇺' },
  ];

  const getTimeInTimezone = (tz: string) => {
    try {
      return now.toLocaleTimeString('ru-RU', { 
        timeZone: tz, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return '--:--:--';
    }
  };

  const getDateInTimezone = (tz: string) => {
    try {
      return now.toLocaleDateString('ru-RU', { 
        timeZone: tz,
        day: 'numeric',
        month: 'short'
      });
    } catch {
      return '';
    }
  };

  // Unix timestamp
  const unixTimestamp = Math.floor(now.getTime() / 1000);
  const unixMs = now.getTime();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Точное время онлайн
        </h1>
        <p className="text-gray-500">Время с точностью до миллисекунд</p>
      </div>

      {/* Main Time Display */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
          <span>📍</span> {timezone} ({timezoneOffset})
        </div>
        
        <div className="flex justify-center items-baseline gap-2">
          <div className="text-7xl md:text-9xl font-mono font-bold tracking-tight">
            {hours}
          </div>
          <div className="text-5xl md:text-7xl font-mono font-bold text-gray-400 animate-pulse">:</div>
          <div className="text-7xl md:text-9xl font-mono font-bold tracking-tight">
            {minutes}
          </div>
          <div className="text-5xl md:text-7xl font-mono font-bold text-gray-400 animate-pulse">:</div>
          <div className="text-7xl md:text-9xl font-mono font-bold tracking-tight">
            {seconds}
          </div>
          <div className="text-3xl md:text-5xl font-mono text-gray-400">.{milliseconds}</div>
        </div>

        <div className="mt-6 text-xl text-gray-300">
          {now.toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </div>
      </div>

      {/* Time Formats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">24-часовой формат</div>
          <div className="text-2xl font-mono font-bold">{hours}:{minutes}:{seconds}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">12-часовой формат</div>
          <div className="text-2xl font-mono font-bold">
            {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Unix timestamp</div>
          <div className="text-2xl font-mono font-bold">{unixTimestamp}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="text-sm text-gray-500 mb-1">Миллисекунды</div>
          <div className="text-2xl font-mono font-bold">{unixMs}</div>
        </div>
      </div>

      {/* ISO Format */}
      <div className="bg-white rounded-xl p-5 shadow-sm border">
        <div className="text-sm text-gray-500 mb-1">ISO 8601 формат</div>
        <div className="text-xl font-mono font-bold break-all">{now.toISOString()}</div>
      </div>

      {/* World Clocks */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🌍 Мировое время</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {worldClocks.map((clock) => (
            <div 
              key={clock.tz} 
              className={`bg-white rounded-xl p-4 shadow-sm border ${
                clock.tz === timezone ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{clock.flag}</span>
                <span className="font-medium text-gray-900">{clock.city}</span>
              </div>
              <div className="text-2xl font-mono font-bold text-blue-600">
                {getTimeInTimezone(clock.tz)}
              </div>
              <div className="text-sm text-gray-500">
                {getDateInTimezone(clock.tz)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timezone Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">О точном времени</h3>
        <div className="prose prose-gray max-w-none text-sm">
          <p>
            Время на данной странице синхронизировано с системными часами вашего устройства.
            Для максимальной точности рекомендуется включить автоматическую синхронизацию времени
            в настройках операционной системы.
          </p>
          <p className="mt-2">
            Часовой пояс определяется автоматически на основе настроек вашего браузера:
            <strong> {timezone}</strong> (смещение {timezoneOffset} относительно UTC).
          </p>
          <p className="mt-2">
            Для определения часового пояса используются следующие методы:
          </p>
          <ul className="mt-1">
            <li>Intl.DateTimeFormat API — определяет название часового пояса</li>
            <li>Date.getTimezoneOffset() — определяет смещение в минутах</li>
            <li>Геолокация браузера (при наличии разрешения)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
