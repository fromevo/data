import { useState } from 'react';
import { getChineseZodiac } from '../utils/dateUtils';

export function ChineseYearsPage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  const zodiac = getChineseZodiac(selectedYear);

  const animals = [
    { name: 'Крыса', emoji: '🐀', traits: 'Умная, хитрая, очаровательная, практичная', years: '2020, 2008, 1996, 1984, 1972, 1960' },
    { name: 'Бык', emoji: '🐂', traits: 'Надёжный, терпеливый, трудолюбивый, упрямый', years: '2021, 2009, 1997, 1985, 1973, 1961' },
    { name: 'Тигр', emoji: '🐅', traits: 'Храбрый, уверенный, непредсказуемый, харизматичный', years: '2022, 2010, 1998, 1986, 1974, 1962' },
    { name: 'Кролик', emoji: '🐇', traits: 'Элегантный, добрый, осторожный, ответственный', years: '2023, 2011, 1999, 1987, 1975, 1963' },
    { name: 'Дракон', emoji: '🐉', traits: 'Энергичный, бесстрашный, амбициозный, лидер', years: '2024, 2012, 2000, 1988, 1976, 1964' },
    { name: 'Змея', emoji: '🐍', traits: 'Мудрая, загадочная, интуитивная, элегантная', years: '2025, 2013, 2001, 1989, 1977, 1965' },
    { name: 'Лошадь', emoji: '🐎', traits: 'Активная, энергичная, независимая, нетерпеливая', years: '2026, 2014, 2002, 1990, 1978, 1966' },
    { name: 'Коза', emoji: '🐐', traits: 'Творческая, нежная, застенчивая, спокойная', years: '2027, 2015, 2003, 1991, 1979, 1967' },
    { name: 'Обезьяна', emoji: '🐒', traits: 'Остроумная, любопытная, игривая, изобретательная', years: '2028, 2016, 2004, 1992, 1980, 1968' },
    { name: 'Петух', emoji: '🐓', traits: 'Честный, яркий, общительный, трудолюбивый', years: '2029, 2017, 2005, 1993, 1981, 1969' },
    { name: 'Собака', emoji: '🐕', traits: 'Верная, честная, добрая, осторожная', years: '2030, 2018, 2006, 1994, 1982, 1970' },
    { name: 'Свинья', emoji: '🐖', traits: 'Щедрая, добрая, трудолюбивая, искренняя', years: '2031, 2019, 2007, 1995, 1983, 1971' },
  ];

  const elements = [
    { name: 'Дерево', color: 'bg-green-500', desc: 'Рост, творчество, гибкость' },
    { name: 'Огонь', color: 'bg-red-500', desc: 'Страсть, энергия, лидерство' },
    { name: 'Земля', color: 'bg-yellow-600', desc: 'Стабильность, надёжность, практичность' },
    { name: 'Металл', color: 'bg-gray-400', desc: 'Сила, решительность, справедливость' },
    { name: 'Вода', color: 'bg-blue-500', desc: 'Мудрость, гибкость, интуиция' },
  ];

  const currentElement = elements.find(e => e.name === zodiac.element);

  // Generate years list
  const yearsRange = [];
  for (let y = currentYear + 10; y >= 1900; y--) {
    yearsRange.push(y);
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          🐉 Китайский календарь
        </h1>
        <p className="text-gray-500">Восточный гороскоп и годы животных</p>
      </div>

      {/* Current Year */}
      <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-8 text-white text-center">
        <div className="text-8xl mb-4">{zodiac.emoji}</div>
        <h2 className="text-3xl font-bold mb-2">
          {selectedYear} — Год {zodiac.animal}
        </h2>
        <div className="text-xl opacity-90">Стихия: {zodiac.element}</div>
        <div className={`inline-block mt-4 px-4 py-2 rounded-full ${currentElement?.color} bg-opacity-30`}>
          {currentElement?.desc}
        </div>
      </div>

      {/* Year Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Узнать год любого животного</h3>
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {yearsRange.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button
            onClick={() => setSelectedYear(currentYear)}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Текущий год
          </button>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{zodiac.emoji}</span>
            <div>
              <div className="text-lg font-semibold">{selectedYear} — Год {zodiac.animal}</div>
              <div className="text-gray-600">Стихия: {zodiac.element}</div>
            </div>
          </div>
        </div>
      </div>

      {/* All Animals */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">12 животных восточного гороскопа</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animals.map((animal, i) => {
            const isCurrentAnimal = animal.name === zodiac.animal;
            return (
              <div 
                key={i} 
                className={`bg-white rounded-xl p-5 shadow-sm border ${
                  isCurrentAnimal ? 'ring-2 ring-red-500 bg-red-50' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-5xl">{animal.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{animal.name}</h3>
                    <div className="text-sm text-gray-500">№{i + 1} в цикле</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{animal.traits}</p>
                <div className="text-xs text-gray-400">Годы: {animal.years}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Elements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Пять стихий</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {elements.map((element, i) => (
            <div 
              key={i} 
              className={`text-center p-4 rounded-lg ${
                element.name === zodiac.element ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${element.color}`}></div>
              <div className="font-medium">{element.name}</div>
              <div className="text-xs text-gray-500 mt-1">{element.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cycle Explanation */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">О китайском календаре</h3>
        <div className="text-gray-700 space-y-3 text-sm">
          <p>
            Китайский зодиакальный цикл состоит из 12 животных и повторяется каждые 12 лет.
            Каждое животное имеет свои уникальные характеристики.
          </p>
          <p>
            Помимо животных, существует 5 стихий (элементов): Дерево, Огонь, Земля, Металл и Вода.
            Полный цикл из 12 животных и 5 стихий составляет 60 лет.
          </p>
          <p>
            Считается, что год рождения определяет характер и судьбу человека.
            Люди, рождённые в год определённого животного, обладают его характерными чертами.
          </p>
        </div>
      </div>

      {/* Years Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Таблица годов (2020-2035)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-3">Год</th>
              <th className="text-left py-2 px-3">Животное</th>
              <th className="text-left py-2 px-3">Стихия</th>
              <th className="text-left py-2 px-3">Начало года</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 16 }, (_, i) => {
              const y = 2020 + i;
              const z = getChineseZodiac(y);
              const chineseNewYear = new Date(y, 0, 21 + (y % 19 * 11) % 30);
              return (
                <tr key={y} className={`border-b ${y === currentYear ? 'bg-yellow-50' : ''}`}>
                  <td className="py-2 px-3 font-medium">{y}</td>
                  <td className="py-2 px-3">
                    <span className="mr-2">{z.emoji}</span>
                    {z.animal}
                  </td>
                  <td className="py-2 px-3">{z.element}</td>
                  <td className="py-2 px-3 text-gray-500">
                    ~{chineseNewYear.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
