import { useState, useEffect } from 'react';
import { getMoonPhase, getLunarDay, monthsRu, daysInMonth } from '../utils/dateUtils';

export function LunarPage() {
  const [now, setNow] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  
  const moonPhase = getMoonPhase(selectedDate);
  const lunarDay = getLunarDay(selectedDate);

  // Generate month calendar
  const days = daysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const phaseDescriptions: Record<string, string> = {
    'Новолуние': 'Начало лунного цикла. Время для планирования, посева идей. Энергия на минимуме, лучше отдыхать.',
    'Молодая луна': 'Луна начинает расти. Хорошее время для начала новых дел и проектов.',
    'Первая четверть': 'Луна наполовину освещена. Время активных действий и преодоления препятствий.',
    'Прибывающая луна': 'Луна почти полная. Энергия нарастает, проекты набирают силу.',
    'Полнолуние': 'Пик лунного цикла. Максимальная энергия, время завершения дел. Может быть эмоционально насыщенным.',
    'Убывающая луна': 'Луна начинает убывать. Время для анализа и оптимизации.',
    'Последняя четверть': 'Луна наполовину освещена. Время завершать начатое и готовиться к новому циклу.',
    'Старая луна': 'Завершение цикла. Время для отдыха, медитации и очищения.',
  };

  const lunarDayDescriptions: Record<number, string> = {
    1: 'День новых начинаний. Мечтайте и планируйте.',
    2: 'День сбора информации. Хорош для покупок.',
    3: 'День активности. Время действовать!',
    4: 'День выбора. Будьте осторожны с решениями.',
    5: 'День верности. Укрепляйте отношения.',
    6: 'День гармонии. Хорош для отдыха на природе.',
    7: 'День слова. Следите за тем, что говорите.',
    8: 'День трансформации. Время перемен.',
    9: 'День опасностей. Будьте осторожны.',
    10: 'День семьи. Проведите время с близкими.',
    11: 'День силы. Энергия на максимуме.',
    12: 'День сердца. Слушайте интуицию.',
    13: 'День обучения. Хорош для учёбы.',
    14: 'День призыва. Просите о помощи.',
    15: 'День полнолуния. Пик эмоций.',
    16: 'День гармонии. Избегайте конфликтов.',
    17: 'День женственности. Творчество благоприятно.',
    18: 'День зеркала. Работайте над собой.',
    19: 'День паука. Осторожно с тайнами.',
    20: 'День орла. Высокие цели и духовность.',
    21: 'День храбрости. Преодолевайте страхи.',
    22: 'День мудрости. Учитесь и передавайте знания.',
    23: 'День крокодила. Будьте гибкими.',
    24: 'День пробуждения. Медитация и созерцание.',
    25: 'День черепахи. Не торопитесь.',
    26: 'День жабы. Избегайте пустых разговоров.',
    27: 'День прощения. Отпустите обиды.',
    28: 'День лотоса. Духовные практики.',
    29: 'День осьминога. Избегайте рисков.',
    30: 'День лебедя. Завершение цикла.',
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(year, month + delta, 1);
    setSelectedDate(newDate);
  };

  const selectDay = (day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          🌙 Лунный календарь
        </h1>
        <p className="text-gray-500">Фазы луны и лунные дни</p>
      </div>

      {/* Current Moon */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white text-center">
        <div className="text-8xl mb-4">{moonPhase.emoji}</div>
        <h2 className="text-2xl font-bold mb-2">{moonPhase.name}</h2>
        <div className="text-xl opacity-90">{lunarDay}-й лунный день</div>
        <div className="mt-4 text-white/80">
          {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Month Calendar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-xl font-semibold">{monthsRu[month]} {year}</h3>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Week header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => (
            <div key={d} className="text-center text-sm text-gray-500 font-medium py-2">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells */}
          {Array.from({ length: adjustedFirstDay }, (_, i) => (
            <div key={`empty-${i}`} className="h-20"></div>
          ))}
          
          {/* Days */}
          {Array.from({ length: days }, (_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            const phase = getMoonPhase(date);
            const lunar = getLunarDay(date);
            const isToday = date.toDateString() === now.toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            
            return (
              <button
                key={day}
                onClick={() => selectDay(day)}
                className={`h-20 rounded-lg p-2 text-center transition flex flex-col items-center justify-center ${
                  isSelected ? 'bg-purple-100 ring-2 ring-purple-500' :
                  isToday ? 'bg-blue-50 ring-2 ring-blue-400' :
                  'hover:bg-gray-50'
                }`}
              >
                <div className="text-lg font-medium">{day}</div>
                <div className="text-2xl">{phase.emoji}</div>
                <div className="text-xs text-gray-500">{lunar} л.д.</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Фаза луны</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{moonPhase.emoji}</div>
            <div>
              <div className="text-xl font-semibold">{moonPhase.name}</div>
              <div className="text-gray-500">Фаза {moonPhase.phase + 1} из 8</div>
            </div>
          </div>
          <p className="text-gray-600">{phaseDescriptions[moonPhase.name]}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{lunarDay}-й лунный день</h3>
          <p className="text-gray-600 mb-4">
            {lunarDayDescriptions[lunarDay] || 'Обычный лунный день. Следуйте интуиции.'}
          </p>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-800">
              <strong>Совет:</strong> {
                lunarDay <= 10 ? 'Первая декада — время роста и развития.' :
                lunarDay <= 20 ? 'Вторая декада — время реализации планов.' :
                'Третья декада — время завершения и подготовки к новому циклу.'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Moon Phases Legend */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Все фазы луны</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🌑', name: 'Новолуние', desc: '0% освещённости' },
            { emoji: '🌒', name: 'Молодая луна', desc: '1-49% растущая' },
            { emoji: '🌓', name: 'Первая четверть', desc: '50% растущая' },
            { emoji: '🌔', name: 'Прибывающая', desc: '51-99% растущая' },
            { emoji: '🌕', name: 'Полнолуние', desc: '100% освещённости' },
            { emoji: '🌖', name: 'Убывающая', desc: '99-51% убывающая' },
            { emoji: '🌗', name: 'Последняя четверть', desc: '50% убывающая' },
            { emoji: '🌘', name: 'Старая луна', desc: '49-1% убывающая' },
          ].map((phase, i) => (
            <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-2">{phase.emoji}</div>
              <div className="font-medium text-gray-900">{phase.name}</div>
              <div className="text-xs text-gray-500">{phase.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
