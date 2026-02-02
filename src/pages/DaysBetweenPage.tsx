import { useState } from 'react';
import { daysBetween, pluralize, daysOfWeekRu, monthsRuGenitive, getWeekNumber } from '../utils/dateUtils';

export function DaysBetweenPage() {
  const today = new Date();
  const [date1, setDate1] = useState(today.toISOString().split('T')[0]);
  const [date2, setDate2] = useState(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);
  const diff = daysBetween(date1Obj, date2Obj);
  const absDiff = Math.abs(diff);

  const weeks = Math.floor(absDiff / 7);
  const remainingDays = absDiff % 7;
  const months = Math.floor(absDiff / 30);

  const formatDateFull = (date: Date) => {
    return `${date.getDate()} ${monthsRuGenitive[date.getMonth()]} ${date.getFullYear()} г., ${daysOfWeekRu[date.getDay()]}`;
  };

  // Working days calculation (approximate)
  const calculateWorkingDays = () => {
    let workDays = 0;
    const start = date1Obj < date2Obj ? date1Obj : date2Obj;
    const end = date1Obj < date2Obj ? date2Obj : date1Obj;
    
    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workDays++;
      }
      current.setDate(current.getDate() + 1);
    }
    return workDays;
  };

  const workingDays = calculateWorkingDays();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          📅 Дней между датами
        </h1>
        <p className="text-gray-500">Рассчитайте количество дней между любыми датами</p>
      </div>

      {/* Date Inputs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Начальная дата
            </label>
            <input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <div className="mt-2 text-sm text-gray-500">
              {date1 && formatDateFull(date1Obj)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Конечная дата
            </label>
            <input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <div className="mt-2 text-sm text-gray-500">
              {date2 && formatDateFull(date2Obj)}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              setDate1(date2);
              setDate2(date1);
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Поменять даты местами
          </button>
        </div>
      </div>

      {/* Result */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <div className="text-sm opacity-80 mb-2">Между датами</div>
        <div className="text-5xl md:text-7xl font-bold mb-2">
          {absDiff}
        </div>
        <div className="text-xl opacity-90">
          {pluralize(absDiff, ['день', 'дня', 'дней'])}
        </div>
        {diff < 0 && (
          <div className="mt-2 text-sm opacity-75">
            (первая дата позже второй)
          </div>
        )}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-blue-600">{weeks}</div>
          <div className="text-sm text-gray-500">{pluralize(weeks, ['неделя', 'недели', 'недель'])}</div>
          {remainingDays > 0 && (
            <div className="text-xs text-gray-400">и {remainingDays} {pluralize(remainingDays, ['день', 'дня', 'дней'])}</div>
          )}
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-purple-600">{months}</div>
          <div className="text-sm text-gray-500">{pluralize(months, ['месяц', 'месяца', 'месяцев'])}</div>
          <div className="text-xs text-gray-400">(примерно)</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-green-600">{workingDays}</div>
          <div className="text-sm text-gray-500">рабочих дней</div>
          <div className="text-xs text-gray-400">(без праздников)</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-orange-600">{absDiff * 24}</div>
          <div className="text-sm text-gray-500">{pluralize(absDiff * 24, ['час', 'часа', 'часов'])}</div>
        </div>
      </div>

      {/* More Conversions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Другие единицы измерения</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{absDiff * 24 * 60}</div>
            <div className="text-sm text-gray-500">{pluralize(absDiff * 24 * 60, ['минута', 'минуты', 'минут'])}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{(absDiff * 24 * 60 * 60).toLocaleString()}</div>
            <div className="text-sm text-gray-500">{pluralize(absDiff * 24 * 60 * 60, ['секунда', 'секунды', 'секунд'])}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{(absDiff / 365).toFixed(2)}</div>
            <div className="text-sm text-gray-500">лет</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{(absDiff / 30.44).toFixed(1)}</div>
            <div className="text-sm text-gray-500">месяцев</div>
          </div>
        </div>
      </div>

      {/* Date Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Начальная дата</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Дата</span>
              <span className="font-medium">{date1Obj.toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">День недели</span>
              <span className="font-medium">{daysOfWeekRu[date1Obj.getDay()]}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Неделя года</span>
              <span className="font-medium">{getWeekNumber(date1Obj)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Unix timestamp</span>
              <span className="font-medium font-mono">{Math.floor(date1Obj.getTime() / 1000)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Конечная дата</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Дата</span>
              <span className="font-medium">{date2Obj.toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">День недели</span>
              <span className="font-medium">{daysOfWeekRu[date2Obj.getDay()]}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Неделя года</span>
              <span className="font-medium">{getWeekNumber(date2Obj)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Unix timestamp</span>
              <span className="font-medium font-mono">{Math.floor(date2Obj.getTime() / 1000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
