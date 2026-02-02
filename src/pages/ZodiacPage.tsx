import { useState } from 'react';
import { getWesternZodiac } from '../utils/dateUtils';

const zodiacSigns = [
  {
    sign: 'Овен',
    emoji: '♈',
    dates: '21 марта — 19 апреля',
    element: 'Огонь',
    planet: 'Марс',
    traits: 'Энергичный, уверенный, смелый, импульсивный',
    description: 'Овен — первый знак зодиака, символизирующий начало и новые начинания. Овны известны своей энергичностью, смелостью и лидерскими качествами. Они не боятся трудностей и всегда готовы к действию.',
    compatibility: ['Лев', 'Стрелец', 'Близнецы', 'Водолей'],
    color: 'Красный',
    stone: 'Алмаз',
  },
  {
    sign: 'Телец',
    emoji: '♉',
    dates: '20 апреля — 20 мая',
    element: 'Земля',
    planet: 'Венера',
    traits: 'Надёжный, терпеливый, практичный, упрямый',
    description: 'Телец — знак стабильности и материального благополучия. Тельцы ценят комфорт, красоту и качество. Они надёжны и верны, но могут быть упрямыми.',
    compatibility: ['Дева', 'Козерог', 'Рак', 'Рыбы'],
    color: 'Зелёный',
    stone: 'Изумруд',
  },
  {
    sign: 'Близнецы',
    emoji: '♊',
    dates: '21 мая — 20 июня',
    element: 'Воздух',
    planet: 'Меркурий',
    traits: 'Общительный, любопытный, адаптивный, непостоянный',
    description: 'Близнецы — знак общения и интеллекта. Они любознательны, быстро учатся и легко адаптируются к новым ситуациям. Близнецы — прекрасные собеседники.',
    compatibility: ['Весы', 'Водолей', 'Овен', 'Лев'],
    color: 'Жёлтый',
    stone: 'Агат',
  },
  {
    sign: 'Рак',
    emoji: '♋',
    dates: '21 июня — 22 июля',
    element: 'Вода',
    planet: 'Луна',
    traits: 'Эмоциональный, заботливый, интуитивный, ранимый',
    description: 'Рак — знак дома и семьи. Раки очень эмоциональны и заботливы, они привязаны к близким и дому. Интуиция — их сильная сторона.',
    compatibility: ['Скорпион', 'Рыбы', 'Телец', 'Дева'],
    color: 'Серебряный',
    stone: 'Жемчуг',
  },
  {
    sign: 'Лев',
    emoji: '♌',
    dates: '23 июля — 22 августа',
    element: 'Огонь',
    planet: 'Солнце',
    traits: 'Харизматичный, щедрый, творческий, гордый',
    description: 'Лев — царь зодиака. Львы яркие, харизматичные и творческие личности. Они любят быть в центре внимания и щедры к окружающим.',
    compatibility: ['Овен', 'Стрелец', 'Близнецы', 'Весы'],
    color: 'Золотой',
    stone: 'Рубин',
  },
  {
    sign: 'Дева',
    emoji: '♍',
    dates: '23 августа — 22 сентября',
    element: 'Земля',
    planet: 'Меркурий',
    traits: 'Аналитичный, практичный, трудолюбивый, критичный',
    description: 'Дева — знак совершенства и служения. Девы внимательны к деталям, практичны и трудолюбивы. Они стремятся к порядку во всём.',
    compatibility: ['Телец', 'Козерог', 'Рак', 'Скорпион'],
    color: 'Бежевый',
    stone: 'Сапфир',
  },
  {
    sign: 'Весы',
    emoji: '♎',
    dates: '23 сентября — 22 октября',
    element: 'Воздух',
    planet: 'Венера',
    traits: 'Дипломатичный, справедливый, общительный, нерешительный',
    description: 'Весы — знак баланса и гармонии. Весы ценят красоту, справедливость и партнёрство. Они — прирождённые дипломаты.',
    compatibility: ['Близнецы', 'Водолей', 'Лев', 'Стрелец'],
    color: 'Розовый',
    stone: 'Опал',
  },
  {
    sign: 'Скорпион',
    emoji: '♏',
    dates: '23 октября — 21 ноября',
    element: 'Вода',
    planet: 'Плутон',
    traits: 'Страстный, решительный, проницательный, скрытный',
    description: 'Скорпион — самый интенсивный знак зодиака. Скорпионы страстны, решительны и обладают невероятной силой воли. Они способны к глубокой трансформации.',
    compatibility: ['Рак', 'Рыбы', 'Дева', 'Козерог'],
    color: 'Бордовый',
    stone: 'Топаз',
  },
  {
    sign: 'Стрелец',
    emoji: '♐',
    dates: '22 ноября — 21 декабря',
    element: 'Огонь',
    planet: 'Юпитер',
    traits: 'Оптимистичный, свободолюбивый, философский, прямолинейный',
    description: 'Стрелец — знак путешествий и философии. Стрельцы оптимистичны, свободолюбивы и всегда в поиске истины и новых приключений.',
    compatibility: ['Овен', 'Лев', 'Весы', 'Водолей'],
    color: 'Фиолетовый',
    stone: 'Бирюза',
  },
  {
    sign: 'Козерог',
    emoji: '♑',
    dates: '22 декабря — 19 января',
    element: 'Земля',
    planet: 'Сатурн',
    traits: 'Амбициозный, дисциплинированный, терпеливый, серьёзный',
    description: 'Козерог — знак достижений и статуса. Козероги амбициозны, дисциплинированы и готовы упорно работать ради своих целей.',
    compatibility: ['Телец', 'Дева', 'Скорпион', 'Рыбы'],
    color: 'Коричневый',
    stone: 'Гранат',
  },
  {
    sign: 'Водолей',
    emoji: '♒',
    dates: '20 января — 18 февраля',
    element: 'Воздух',
    planet: 'Уран',
    traits: 'Независимый, оригинальный, гуманный, непредсказуемый',
    description: 'Водолей — знак инноваций и человечества. Водолеи независимы, оригинальны и всегда мыслят нестандартно. Они заботятся о благе общества.',
    compatibility: ['Близнецы', 'Весы', 'Овен', 'Стрелец'],
    color: 'Электрик',
    stone: 'Аметист',
  },
  {
    sign: 'Рыбы',
    emoji: '♓',
    dates: '19 февраля — 20 марта',
    element: 'Вода',
    planet: 'Нептун',
    traits: 'Интуитивный, творческий, сострадательный, мечтательный',
    description: 'Рыбы — самый духовный знак зодиака. Рыбы обладают богатым воображением, интуицией и глубоким состраданием к окружающим.',
    compatibility: ['Рак', 'Скорпион', 'Телец', 'Козерог'],
    color: 'Морской',
    stone: 'Аквамарин',
  },
];

const elementColors: Record<string, string> = {
  'Огонь': 'bg-red-100 text-red-700',
  'Земля': 'bg-green-100 text-green-700',
  'Воздух': 'bg-blue-100 text-blue-700',
  'Вода': 'bg-cyan-100 text-cyan-700',
};

export function ZodiacPage() {
  const today = new Date();
  const currentZodiac = getWesternZodiac(today);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState('');

  const selectedZodiac = zodiacSigns.find(z => z.sign === selectedSign);

  const getZodiacFromDate = () => {
    if (!birthDate) return null;
    const date = new Date(birthDate);
    return getWesternZodiac(date);
  };

  const birthZodiac = getZodiacFromDate();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          ♈ Знаки зодиака
        </h1>
        <p className="text-gray-500">Западный зодиакальный гороскоп</p>
      </div>

      {/* Current Sign */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center">
        <div className="text-6xl mb-4">{currentZodiac.emoji}</div>
        <h2 className="text-2xl font-bold mb-2">
          Сейчас — {currentZodiac.sign}
        </h2>
        <div className="opacity-90">{currentZodiac.dates}</div>
      </div>

      {/* Birth Date Calculator */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Узнать свой знак зодиака</h3>
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          {birthZodiac && (
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-4xl">{birthZodiac.emoji}</span>
              <div>
                <div className="font-semibold">{birthZodiac.sign}</div>
                <div className="text-sm text-gray-500">{birthZodiac.dates}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* All Signs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {zodiacSigns.map((zodiac) => (
          <button
            key={zodiac.sign}
            onClick={() => setSelectedSign(selectedSign === zodiac.sign ? null : zodiac.sign)}
            className={`bg-white rounded-xl p-5 shadow-sm border text-left transition hover:shadow-md ${
              selectedSign === zodiac.sign ? 'ring-2 ring-purple-500' : ''
            } ${currentZodiac.sign === zodiac.sign ? 'bg-purple-50' : ''}`}
          >
            <div className="text-4xl mb-2">{zodiac.emoji}</div>
            <h3 className="font-semibold text-gray-900">{zodiac.sign}</h3>
            <div className="text-xs text-gray-500 mt-1">{zodiac.dates}</div>
            <div className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${elementColors[zodiac.element]}`}>
              {zodiac.element}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Sign Details */}
      {selectedZodiac && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-7xl">{selectedZodiac.emoji}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{selectedZodiac.sign}</h2>
              <div className="text-gray-500">{selectedZodiac.dates}</div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`px-3 py-1 rounded-full text-sm ${elementColors[selectedZodiac.element]}`}>
                  {selectedZodiac.element}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  Планета: {selectedZodiac.planet}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{selectedZodiac.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Характеристики</h4>
              <p className="text-gray-600 text-sm">{selectedZodiac.traits}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Совместимость</h4>
              <div className="flex flex-wrap gap-2">
                {selectedZodiac.compatibility.map(sign => (
                  <span key={sign} className="px-2 py-1 bg-white rounded text-sm text-gray-700">
                    {zodiacSigns.find(z => z.sign === sign)?.emoji} {sign}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Цвет</h4>
              <p className="text-gray-600 text-sm">{selectedZodiac.color}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Камень</h4>
              <p className="text-gray-600 text-sm">{selectedZodiac.stone}</p>
            </div>
          </div>
        </div>
      )}

      {/* Elements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Четыре стихии</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Огонь', signs: ['Овен', 'Лев', 'Стрелец'], emoji: '🔥', color: 'bg-red-500' },
            { name: 'Земля', signs: ['Телец', 'Дева', 'Козерог'], emoji: '🌍', color: 'bg-green-500' },
            { name: 'Воздух', signs: ['Близнецы', 'Весы', 'Водолей'], emoji: '💨', color: 'bg-blue-500' },
            { name: 'Вода', signs: ['Рак', 'Скорпион', 'Рыбы'], emoji: '💧', color: 'bg-cyan-500' },
          ].map(element => (
            <div key={element.name} className="text-center p-4 rounded-lg bg-gray-50">
              <div className="text-3xl mb-2">{element.emoji}</div>
              <div className="font-semibold">{element.name}</div>
              <div className="text-xs text-gray-500 mt-2">
                {element.signs.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
