import { useState, useEffect } from 'react';
import { getTimeUntil, pluralize } from '../utils/dateUtils';

export function CountdownPage() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('00:00');
  const [eventName, setEventName] = useState('');
  const [, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTargetDateTime = () => {
    if (!targetDate) return null;
    const [hours, minutes] = targetTime.split(':').map(Number);
    const date = new Date(targetDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const targetDateTime = getTargetDateTime();
  const timeUntil = targetDateTime ? getTimeUntil(targetDateTime) : null;

  // Preset events
  const presets = [
    { name: 'Новый год 2026', date: '2026-01-01', time: '00:00' },
    { name: '23 февраля 2025', date: '2025-02-23', time: '00:00' },
    { name: '8 марта 2025', date: '2025-03-08', time: '00:00' },
    { name: 'День Победы 2025', date: '2025-05-09', time: '00:00' },
    { name: 'Лето 2025', date: '2025-06-01', time: '00:00' },
    { name: 'Новый год 2025', date: '2025-01-01', time: '00:00' },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setTargetDate(preset.date);
    setTargetTime(preset.time);
    setEventName(preset.name);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          ⏱️ Обратный отсчёт
        </h1>
        <p className="text-gray-500">Создайте таймер до любого события</p>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название события
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Мой день рождения"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Время
            </label>
            <input
              type="time"
              value={targetTime}
              onChange={(e) => setTargetTime(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-2">Быстрый выбор:</div>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, i) => (
              <button
                key={i}
                onClick={() => applyPreset(preset)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Countdown Display */}
      {timeUntil && targetDateTime && (
        <div className={`rounded-3xl p-8 text-white text-center ${
          timeUntil.total > 0 
            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' 
            : 'bg-gradient-to-r from-green-500 to-emerald-600'
        }`}>
          {eventName && (
            <h2 className="text-2xl font-bold mb-2">{eventName}</h2>
          )}
          <div className="text-sm opacity-80 mb-6">
            {targetDateTime.toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>

          {timeUntil.total > 0 ? (
            <>
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-4xl md:text-6xl font-bold">{timeUntil.days}</div>
                  <div className="text-sm opacity-80">{pluralize(timeUntil.days, ['день', 'дня', 'дней'])}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-4xl md:text-6xl font-bold">{timeUntil.hours}</div>
                  <div className="text-sm opacity-80">{pluralize(timeUntil.hours, ['час', 'часа', 'часов'])}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-4xl md:text-6xl font-bold">{timeUntil.minutes}</div>
                  <div className="text-sm opacity-80">{pluralize(timeUntil.minutes, ['минута', 'минуты', 'минут'])}</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="text-4xl md:text-6xl font-bold">{timeUntil.seconds}</div>
                  <div className="text-sm opacity-80">{pluralize(timeUntil.seconds, ['секунда', 'секунды', 'секунд'])}</div>
                </div>
              </div>

              {/* Total stats */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm opacity-80">
                <span>Всего: {timeUntil.days * 24 + timeUntil.hours} часов</span>
                <span>|</span>
                <span>{(timeUntil.days * 24 * 60 + timeUntil.hours * 60 + timeUntil.minutes).toLocaleString()} минут</span>
              </div>
            </>
          ) : (
            <div className="text-4xl font-bold">
              🎉 Событие наступило!
            </div>
          )}
        </div>
      )}

      {!targetDate && (
        <div className="bg-gray-100 rounded-2xl p-8 text-center text-gray-500">
          Выберите дату для начала обратного отсчёта
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Совет</h3>
        <p className="text-blue-800 text-sm">
          Вы можете создать таймер до любого события: дня рождения, отпуска, праздника или важной даты.
          Таймер обновляется в реальном времени и учитывает ваш часовой пояс.
        </p>
      </div>
    </div>
  );
}
