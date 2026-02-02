import { useState } from 'react';
import { addDays, pluralize, daysOfWeekRu, monthsRuGenitive } from '../utils/dateUtils';

export function CalcPage() {
  const today = new Date();
  const [baseDate, setBaseDate] = useState(today.toISOString().split('T')[0]);
  const [daysToAdd, setDaysToAdd] = useState(30);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');

  const baseDateObj = new Date(baseDate);
  const resultDate = addDays(baseDateObj, operation === 'add' ? daysToAdd : -daysToAdd);

  const formatResultDate = (date: Date) => {
    return `${date.getDate()} ${monthsRuGenitive[date.getMonth()]} ${date.getFullYear()} г., ${daysOfWeekRu[date.getDay()]}`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          🧮 Калькулятор дат
        </h1>
        <p className="text-gray-500">Добавляйте или вычитайте дни от любой даты</p>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Base Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Начальная дата
            </label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Operation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Операция
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setOperation('add')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  operation === 'add' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                + Добавить
              </button>
              <button
                onClick={() => setOperation('subtract')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition ${
                  operation === 'subtract' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                − Вычесть
              </button>
            </div>
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Количество дней
            </label>
            <input
              type="number"
              min="0"
              value={daysToAdd}
              onChange={(e) => setDaysToAdd(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quick Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[7, 14, 30, 60, 90, 180, 365].map(d => (
            <button
              key={d}
              onClick={() => setDaysToAdd(d)}
              className={`px-3 py-1 rounded-full text-sm transition ${
                daysToAdd === d 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {d} {pluralize(d, ['день', 'дня', 'дней'])}
            </button>
          ))}
        </div>

        {/* Result */}
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white text-center">
          <div className="text-sm opacity-80 mb-2">
            {baseDate && formatResultDate(baseDateObj)} {operation === 'add' ? '+' : '−'} {daysToAdd} {pluralize(daysToAdd, ['день', 'дня', 'дней'])}
          </div>
          <div className="text-2xl md:text-3xl font-bold">
            {formatResultDate(resultDate)}
          </div>
        </div>
      </div>

      {/* Quick Calculations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые расчёты от сегодня</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Через неделю', days: 7 },
            { label: 'Через 2 недели', days: 14 },
            { label: 'Через месяц', days: 30 },
            { label: 'Через 3 месяца', days: 90 },
            { label: 'Через полгода', days: 180 },
            { label: 'Через год', days: 365 },
            { label: 'Неделю назад', days: -7 },
            { label: 'Месяц назад', days: -30 },
            { label: 'Год назад', days: -365 },
          ].map(item => {
            const date = addDays(today, item.days);
            return (
              <div key={item.label} className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="font-semibold text-gray-900">
                  {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="text-xs text-gray-400">
                  {daysOfWeekRu[date.getDay()]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Common Intervals */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Полезные интервалы</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Рабочие интервалы</h4>
            <ul className="space-y-1 text-blue-800">
              <li>• 1 рабочая неделя = 5 дней</li>
              <li>• 2 рабочие недели = 10 дней</li>
              <li>• 1 рабочий месяц ≈ 22 дня</li>
              <li>• 1 квартал = 90-92 дня</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Календарные интервалы</h4>
            <ul className="space-y-1 text-green-800">
              <li>• 1 неделя = 7 дней</li>
              <li>• 1 месяц = 28-31 день</li>
              <li>• 1 год = 365 (366) дней</li>
              <li>• 1 декада = 10 дней</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
