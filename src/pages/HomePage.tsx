import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MiddleAd1, MiddleAd2 } from '../components/AdBanner';
import { 
  formatDate, formatTime, formatTimezoneOffset, getUserTimezone,
  getWeekNumber, getDayOfYear, getMoonPhase, getLunarDay,
  getWesternZodiac, getCurrentSeason, getTimeUntil, getEasterDate,
  pluralize, monthsRu, daysInYear
} from '../utils/dateUtils';

export function HomePage() {
  const [now, setNow] = useState(new Date());
  const timezone = getUserTimezone();
  const timezoneOffset = formatTimezoneOffset();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const weekNumber = getWeekNumber(now);
  const dayOfYear = getDayOfYear(now);
  const moonPhase = getMoonPhase(now);
  const lunarDay = getLunarDay(now);
  const zodiac = getWesternZodiac(now);
  const season = getCurrentSeason(now);
  const daysLeft = daysInYear(year) - dayOfYear;

  // Ближайшие события
  const newYear = new Date(year + 1, 0, 1);
  const easter = getEasterDate(year);
  const nextEaster = easter > now ? easter : getEasterDate(year + 1);
  const summer = new Date(year, 5, 1) > now ? new Date(year, 5, 1) : new Date(year + 1, 5, 1);

  const timeToNewYear = getTimeUntil(newYear);
  const timeToEaster = getTimeUntil(nextEaster);
  const timeToSummer = getTimeUntil(summer);

  const quickLinks = [
    { icon: '📅', title: 'Дата сегодня', desc: 'Подробная информация о сегодняшней дате', path: '/today' },
    { icon: '🕐', title: 'Точное время', desc: 'Текущее время с учётом часового пояса', path: '/time' },
    { icon: '🏢', title: 'Производственный календарь', desc: 'Рабочие и выходные дни', path: '/work/2025' },
    { icon: '🎉', title: 'Праздники России', desc: 'Все праздники на год', path: '/holidays/2025' },
    { icon: '🌙', title: 'Лунный календарь', desc: 'Фазы луны и лунные дни', path: '/lunar' },
    { icon: '🐉', title: 'Китайский календарь', desc: 'Год какого животного', path: '/china-years' },
    { icon: '♈', title: 'Знаки зодиака', desc: 'Западный зодиакальный гороскоп', path: '/zodiac' },
    { icon: '🧮', title: 'Калькулятор дат', desc: 'Расчёт дней между датами', path: '/calc' },
    { icon: '⏱️', title: 'Обратный отсчёт', desc: 'Создай свой таймер', path: '/countdown' },
    { icon: '🎄', title: 'До Нового года', desc: `${timeToNewYear.days} ${pluralize(timeToNewYear.days, ['день', 'дня', 'дней'])}`, path: '/timer/new-year' },
    { icon: '✝️', title: 'До Пасхи', desc: `${timeToEaster.days} ${pluralize(timeToEaster.days, ['день', 'дня', 'дней'])}`, path: '/timer/easter' },
    { icon: '☀️', title: 'До лета', desc: timeToSummer.total > 0 ? `${timeToSummer.days} ${pluralize(timeToSummer.days, ['день', 'дня', 'дней'])}` : 'Уже лето!', path: '/timer/summer' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          <span>📍</span> {timezone} ({timezoneOffset})
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          {formatDate(now)}
        </h1>
        
        <div className="text-5xl md:text-7xl font-mono font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {formatTime(now)}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <span className="text-gray-500">Неделя:</span>
            <span className="ml-2 font-semibold">{weekNumber}</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <span className="text-gray-500">День года:</span>
            <span className="ml-2 font-semibold">{dayOfYear}</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <span className="text-gray-500">Осталось:</span>
            <span className="ml-2 font-semibold">{daysLeft} {pluralize(daysLeft, ['день', 'дня', 'дней'])}</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
            <span className="text-gray-500">Сезон:</span>
            <span className="ml-2 font-semibold">{season}</span>
          </div>
        </div>
      </div>

      {/* Moon & Zodiac */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-4xl mb-2">{moonPhase.emoji}</div>
          <h3 className="text-lg font-semibold">{moonPhase.name}</h3>
          <p className="text-white/80">{lunarDay}-й лунный день</p>
          <Link to="/lunar" className="mt-4 inline-block text-sm underline hover:no-underline">
            Лунный календарь →
          </Link>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="text-4xl mb-2">{zodiac.emoji}</div>
          <h3 className="text-lg font-semibold">{zodiac.sign}</h3>
          <p className="text-white/80">{zodiac.dates}</p>
          <Link to="/zodiac" className="mt-4 inline-block text-sm underline hover:no-underline">
            Все знаки зодиака →
          </Link>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="text-4xl mb-2">📅</div>
          <h3 className="text-lg font-semibold">{monthsRu[month]} {year}</h3>
          <p className="text-white/80">Сегодня {day} число</p>
          <Link to="/work/2025" className="mt-4 inline-block text-sm underline hover:no-underline">
            Производственный календарь →
          </Link>
        </div>
      </div>

      {/* Блок 2: Первый средний рекламный блок */}
      <MiddleAd1 />

      {/* New Year Countdown */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-6">🎄 До Нового {year + 1} года</h2>
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-3xl md:text-5xl font-bold">{timeToNewYear.days}</div>
            <div className="text-sm opacity-80">{pluralize(timeToNewYear.days, ['день', 'дня', 'дней'])}</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-3xl md:text-5xl font-bold">{timeToNewYear.hours}</div>
            <div className="text-sm opacity-80">{pluralize(timeToNewYear.hours, ['час', 'часа', 'часов'])}</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-3xl md:text-5xl font-bold">{timeToNewYear.minutes}</div>
            <div className="text-sm opacity-80">{pluralize(timeToNewYear.minutes, ['минута', 'минуты', 'минут'])}</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-3xl md:text-5xl font-bold">{timeToNewYear.seconds}</div>
            <div className="text-sm opacity-80">{pluralize(timeToNewYear.seconds, ['секунда', 'секунды', 'секунд'])}</div>
          </div>
        </div>
        <Link to="/timer/new-year" className="mt-6 inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Подробнее
        </Link>
      </div>

      {/* Блок 3: Второй средний рекламный блок */}
      <MiddleAd2 />

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Полезные разделы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition group"
            >
              <div className="text-3xl mb-3">{link.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                {link.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">О сайте «Дата Сегодня»</h2>
        <div className="prose prose-gray max-w-none">
          <p>
            Добро пожаловать на сайт <strong>«Дата Сегодня»</strong> — ваш надёжный помощник для работы с датами и временем!
            Здесь вы найдёте актуальную информацию о текущей дате и времени с учётом вашего часового пояса.
          </p>
          <p className="mt-4">
            Наш сайт предлагает множество полезных инструментов:
          </p>
          <ul className="mt-2 space-y-1">
            <li>📅 <strong>Производственный календарь</strong> — рабочие и выходные дни на год</li>
            <li>🎉 <strong>Календарь праздников</strong> — все государственные и народные праздники</li>
            <li>🌙 <strong>Лунный календарь</strong> — фазы луны и лунные дни</li>
            <li>🐉 <strong>Китайский календарь</strong> — год какого животного по восточному гороскопу</li>
            <li>♈ <strong>Зодиакальный календарь</strong> — знаки зодиака и их характеристики</li>
            <li>🧮 <strong>Калькуляторы дат</strong> — расчёт дней между датами, добавление дней</li>
            <li>⏱️ <strong>Таймеры обратного отсчёта</strong> — до праздников и важных событий</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
