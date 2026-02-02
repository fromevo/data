import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTimeUntil, getEasterDate, getSeasonStart, pluralize, monthsRuGenitive, daysOfWeekRu } from '../utils/dateUtils';

type TimerType = 'new-year' | '23-february' | '8-march' | 'victory-day' | 'easter' | 'spring' | 'summer' | 'autumn' | 'winter' | 'custom';

const timerConfigs: Record<string, { getDate: (year: number) => Date; title: string; emoji: string; description: string; bgClass: string }> = {
  'new-year': {
    getDate: (year) => new Date(year + 1, 0, 1),
    title: 'Нового года',
    emoji: '🎄',
    description: 'Новый год — главный праздник в России. Время подведения итогов, загадывания желаний и семейных встреч.',
    bgClass: 'from-blue-600 via-purple-600 to-pink-600'
  },
  '23-february': {
    getDate: (year) => {
      const date = new Date(year, 1, 23);
      return date > new Date() ? date : new Date(year + 1, 1, 23);
    },
    title: '23 февраля',
    emoji: '🎖️',
    description: 'День защитника Отечества — праздник, посвящённый всем, кто защищал и защищает нашу Родину.',
    bgClass: 'from-green-600 to-emerald-700'
  },
  '8-march': {
    getDate: (year) => {
      const date = new Date(year, 2, 8);
      return date > new Date() ? date : new Date(year + 1, 2, 8);
    },
    title: '8 марта',
    emoji: '🌷',
    description: 'Международный женский день — праздник весны, женственности и красоты.',
    bgClass: 'from-pink-500 to-rose-600'
  },
  'victory-day': {
    getDate: (year) => {
      const date = new Date(year, 4, 9);
      return date > new Date() ? date : new Date(year + 1, 4, 9);
    },
    title: 'Дня Победы',
    emoji: '🎗️',
    description: 'День Победы — священный праздник, посвящённый Победе советского народа в Великой Отечественной войне.',
    bgClass: 'from-orange-500 to-red-600'
  },
  'easter': {
    getDate: (year) => {
      const easter = getEasterDate(year);
      return easter > new Date() ? easter : getEasterDate(year + 1);
    },
    title: 'Пасхи',
    emoji: '✝️',
    description: 'Пасха — главный христианский праздник, посвящённый Воскресению Иисуса Христа.',
    bgClass: 'from-yellow-500 to-orange-500'
  },
  'spring': {
    getDate: (year) => {
      const date = getSeasonStart(year, 'spring');
      return date > new Date() ? date : getSeasonStart(year + 1, 'spring');
    },
    title: 'весны',
    emoji: '🌸',
    description: 'Весна — время пробуждения природы, тепла и новых начинаний.',
    bgClass: 'from-green-400 to-emerald-500'
  },
  'summer': {
    getDate: (year) => {
      const date = getSeasonStart(year, 'summer');
      return date > new Date() ? date : getSeasonStart(year + 1, 'summer');
    },
    title: 'лета',
    emoji: '☀️',
    description: 'Лето — время отдыха, солнца и отпусков.',
    bgClass: 'from-yellow-400 to-orange-500'
  },
  'autumn': {
    getDate: (year) => {
      const date = getSeasonStart(year, 'autumn');
      return date > new Date() ? date : getSeasonStart(year + 1, 'autumn');
    },
    title: 'осени',
    emoji: '🍂',
    description: 'Осень — время урожая, ярких красок и уютных вечеров.',
    bgClass: 'from-orange-500 to-red-500'
  },
  'winter': {
    getDate: (year) => {
      const date = getSeasonStart(year, 'winter');
      return date > new Date() ? date : getSeasonStart(year + 1, 'winter');
    },
    title: 'зимы',
    emoji: '❄️',
    description: 'Зима — время снега, праздников и волшебства.',
    bgClass: 'from-blue-400 to-indigo-600'
  },
};

export function TimerPage() {
  const { type } = useParams<{ type: TimerType }>();
  const [, setNow] = useState(new Date());
  const [customDate, setCustomDate] = useState('');
  const [customTitle, setCustomTitle] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = new Date().getFullYear();
  const config = type && type !== 'custom' ? timerConfigs[type] : null;
  
  let targetDate: Date | null = null;
  let title = '';
  let emoji = '⏱️';
  let description = '';
  let bgClass = 'from-gray-600 to-gray-800';

  if (config) {
    targetDate = config.getDate(year);
    title = config.title;
    emoji = config.emoji;
    description = config.description;
    bgClass = config.bgClass;
  } else if (type === 'custom' && customDate) {
    targetDate = new Date(customDate);
    title = customTitle || 'выбранной даты';
    emoji = '📅';
    description = 'Ваш персональный таймер обратного отсчёта.';
    bgClass = 'from-purple-600 to-indigo-600';
  }

  const timeUntil = targetDate ? getTimeUntil(targetDate) : null;

  const formatTargetDate = (date: Date) => {
    return `${date.getDate()} ${monthsRuGenitive[date.getMonth()]} ${date.getFullYear()} года, ${daysOfWeekRu[date.getDay()]}`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {emoji} Сколько дней до {title}
        </h1>
        {targetDate && (
          <p className="text-gray-500">{formatTargetDate(targetDate)}</p>
        )}
      </div>

      {/* Custom date input */}
      {type === 'custom' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Выберите дату
              </label>
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название события
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Мой день рождения"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Countdown Display */}
      {timeUntil && targetDate && (
        <div className={`bg-gradient-to-r ${bgClass} rounded-3xl p-8 md:p-12 text-white text-center`}>
          <div className="text-6xl mb-4">{emoji}</div>
          
          {timeUntil.total > 0 ? (
            <>
              <div className="text-lg opacity-90 mb-6">До {title} осталось</div>
              
              <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 md:p-6">
                  <div className="text-4xl md:text-7xl font-bold">{timeUntil.days}</div>
                  <div className="text-sm md:text-base opacity-80">{pluralize(timeUntil.days, ['день', 'дня', 'дней'])}</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 md:p-6">
                  <div className="text-4xl md:text-7xl font-bold">{timeUntil.hours}</div>
                  <div className="text-sm md:text-base opacity-80">{pluralize(timeUntil.hours, ['час', 'часа', 'часов'])}</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 md:p-6">
                  <div className="text-4xl md:text-7xl font-bold">{timeUntil.minutes}</div>
                  <div className="text-sm md:text-base opacity-80">{pluralize(timeUntil.minutes, ['минута', 'минуты', 'минут'])}</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4 md:p-6">
                  <div className="text-4xl md:text-7xl font-bold">{timeUntil.seconds}</div>
                  <div className="text-sm md:text-base opacity-80">{pluralize(timeUntil.seconds, ['секунда', 'секунды', 'секунд'])}</div>
                </div>
              </div>

              {/* Additional stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{Math.floor(timeUntil.days / 7)}</div>
                  <div className="text-xs opacity-75">{pluralize(Math.floor(timeUntil.days / 7), ['неделя', 'недели', 'недель'])}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeUntil.days * 24 + timeUntil.hours}</div>
                  <div className="text-xs opacity-75">{pluralize(timeUntil.days * 24 + timeUntil.hours, ['час', 'часа', 'часов'])}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-2xl font-bold">{(timeUntil.days * 24 * 60 + timeUntil.hours * 60).toLocaleString()}</div>
                  <div className="text-xs opacity-75">минут</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-4xl font-bold">
              🎉 Событие наступило!
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">О событии</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      )}

      {/* Related Timers */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Другие таймеры</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(timerConfigs).map(([key, conf]) => {
            const date = conf.getDate(year);
            const time = getTimeUntil(date);
            return (
              <a
                key={key}
                href={`/timer/${key}`}
                className={`p-4 rounded-xl text-center transition hover:shadow-md ${
                  type === key ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-2xl mb-1">{conf.emoji}</div>
                <div className="text-sm font-medium text-gray-900">До {conf.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {time.days} {pluralize(time.days, ['день', 'дня', 'дней'])}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
