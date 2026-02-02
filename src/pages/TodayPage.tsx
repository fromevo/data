import { useState, useEffect } from 'react';
import { 
  formatDate, formatTime, formatTimezoneOffset, getUserTimezone,
  getWeekNumber, getDayOfYear, getMoonPhase, getLunarDay,
  getWesternZodiac, getChineseZodiac, getCurrentSeason, isLeapYear,
  daysInMonth, daysInYear, pluralize, monthsRu, getNameDays,
  getRussianHolidays
} from '../utils/dateUtils';

export function TodayPage() {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const dayOfWeek = now.getDay();
  const weekNumber = getWeekNumber(now);
  const dayOfYear = getDayOfYear(now);
  const quarter = Math.floor(month / 3) + 1;
  const moonPhase = getMoonPhase(now);
  const lunarDay = getLunarDay(now);
  const zodiac = getWesternZodiac(now);
  const chineseZodiac = getChineseZodiac(year);
  const season = getCurrentSeason(now);
  const leapYear = isLeapYear(year);
  const daysThisMonth = daysInMonth(year, month);
  const daysThisYear = daysInYear(year);
  const daysLeftInYear = daysThisYear - dayOfYear;
  const daysLeftInMonth = daysThisMonth - day;
  
  const timezone = getUserTimezone();
  const timezoneOffset = formatTimezoneOffset();
  
  const todayHolidays = getRussianHolidays(year).filter(h => 
    h.date.getMonth() === month && h.date.getDate() === day
  );
  
  const nameDays = getNameDays(month + 1, day);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Дата сегодня
        </h1>
        <p className="text-gray-500">Подробная информация о текущей дате и времени</p>
      </div>

      {/* Main Date/Time Display */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
          <span>📍</span> {timezone} ({timezoneOffset})
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          {formatDate(now)}
        </h2>
        
        <div className="text-5xl md:text-7xl font-mono font-bold">
          {formatTime(now)}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-blue-600">{weekNumber}</div>
          <div className="text-sm text-gray-500">Неделя года</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-purple-600">{dayOfYear}</div>
          <div className="text-sm text-gray-500">День года</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-green-600">{quarter}</div>
          <div className="text-sm text-gray-500">Квартал</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-orange-600">{daysLeftInYear}</div>
          <div className="text-sm text-gray-500">Дней до конца года</div>
        </div>
      </div>

      {/* Detailed Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📅</span> Календарная информация
          </h3>
          <div className="space-y-3">
            <InfoRow label="Дата" value={`${day} ${monthsRu[month].toLowerCase()} ${year} г.`} />
            <InfoRow label="День недели" value={['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][dayOfWeek]} />
            <InfoRow label="Номер недели" value={`${weekNumber}-я неделя`} />
            <InfoRow label="День года" value={`${dayOfYear}-й из ${daysThisYear}`} />
            <InfoRow label="Квартал" value={`${quarter}-й квартал`} />
            <InfoRow label="Сезон" value={season} />
            <InfoRow label="Осталось в месяце" value={`${daysLeftInMonth} ${pluralize(daysLeftInMonth, ['день', 'дня', 'дней'])}`} />
            <InfoRow label="Осталось в году" value={`${daysLeftInYear} ${pluralize(daysLeftInYear, ['день', 'дня', 'дней'])}`} />
            <InfoRow label="Високосный год" value={leapYear ? 'Да' : 'Нет'} />
          </div>
        </div>

        {/* Moon Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🌙</span> Лунный календарь
          </h3>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-6xl">{moonPhase.emoji}</div>
            <div>
              <div className="text-xl font-semibold">{moonPhase.name}</div>
              <div className="text-gray-500">{lunarDay}-й лунный день</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p>
              Лунный день влияет на многие аспекты жизни. 
              {lunarDay <= 7 && ' Растущая луна — благоприятное время для начинаний.'}
              {lunarDay > 7 && lunarDay <= 15 && ' Полнолуние — время завершения дел.'}
              {lunarDay > 15 && lunarDay <= 22 && ' Убывающая луна — время для анализа и отдыха.'}
              {lunarDay > 22 && ' Новолуние приближается — время для планирования.'}
            </p>
          </div>
        </div>

        {/* Zodiac Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>♈</span> Зодиак
          </h3>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-6xl">{zodiac.emoji}</div>
            <div>
              <div className="text-xl font-semibold">{zodiac.sign}</div>
              <div className="text-gray-500">{zodiac.dates}</div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Китайский зодиак {year}</h4>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{chineseZodiac.emoji}</span>
              <div>
                <div className="font-medium">Год {chineseZodiac.animal}</div>
                <div className="text-sm text-gray-500">Стихия: {chineseZodiac.element}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Holidays & Name Days */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎉</span> Праздники и именины
          </h3>
          
          {todayHolidays.length > 0 ? (
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Праздники сегодня:</h4>
              <ul className="space-y-2">
                {todayHolidays.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      h.type === 'official' ? 'bg-red-500' : 
                      h.type === 'religious' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}></span>
                    {h.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">Сегодня нет официальных праздников</p>
          )}
          
          {nameDays.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Именины сегодня:</h4>
              <p className="text-gray-600">{nameDays.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Timezone Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🌍</span> Часовой пояс
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Ваш часовой пояс</div>
            <div className="font-semibold">{timezone}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Смещение от UTC</div>
            <div className="font-semibold">{timezoneOffset}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Определено автоматически</div>
            <div className="font-semibold text-green-600">✓ По данным браузера</div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Часовой пояс определяется автоматически на основе настроек вашего браузера и операционной системы.
          Время отображается в соответствии с вашим локальным часовым поясом.
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
