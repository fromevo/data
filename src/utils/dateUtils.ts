// Русские названия месяцев
export const monthsRu = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export const monthsRuGenitive = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

export const daysOfWeekRu = [
  'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
  'Четверг', 'Пятница', 'Суббота'
];

export const daysOfWeekShortRu = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

// Определение часового пояса пользователя
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'Europe/Moscow';
  }
}

export function getTimezoneOffset(): number {
  return new Date().getTimezoneOffset();
}

export function formatTimezoneOffset(): string {
  const offset = -getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset >= 0 ? '+' : '-';
  return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Форматирование даты
export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = monthsRuGenitive[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = daysOfWeekRu[date.getDay()];
  return `${day} ${month} ${year} года, ${dayOfWeek}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Вычисление количества дней между датами
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((date2.getTime() - date1.getTime()) / oneDay);
}

// Склонение слов
export function pluralize(n: number, forms: [string, string, string]): string {
  const n100 = Math.abs(n) % 100;
  const n10 = n100 % 10;
  if (n100 > 10 && n100 < 20) return forms[2];
  if (n10 > 1 && n10 < 5) return forms[1];
  if (n10 === 1) return forms[0];
  return forms[2];
}

// Получение номера недели в году
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// Получение номера дня в году
export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Проверка високосного года
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Количество дней в году
export function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

// Количество дней в месяце
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Лунные фазы
export function getMoonPhase(date: Date): { phase: number; name: string; emoji: string } {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let c = 0;
  let e = 0;
  let jd = 0;
  let b = 0;

  if (month < 3) {
    c = year - 1;
    e = month + 12;
  } else {
    c = year;
    e = month;
  }

  jd = 365.25 * (c + 4716) + 30.6001 * (e + 1) + day - 1524.5;
  b = (jd - 2451550.1) / 29.530588853;
  b = b - Math.floor(b);

  const phase = Math.round(b * 8) % 8;
  
  const phases = [
    { name: 'Новолуние', emoji: '🌑' },
    { name: 'Молодая луна', emoji: '🌒' },
    { name: 'Первая четверть', emoji: '🌓' },
    { name: 'Прибывающая луна', emoji: '🌔' },
    { name: 'Полнолуние', emoji: '🌕' },
    { name: 'Убывающая луна', emoji: '🌖' },
    { name: 'Последняя четверть', emoji: '🌗' },
    { name: 'Старая луна', emoji: '🌘' }
  ];

  return { phase, ...phases[phase] };
}

// Лунный день
export function getLunarDay(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let c = 0;
  let e = 0;

  if (month < 3) {
    c = year - 1;
    e = month + 12;
  } else {
    c = year;
    e = month;
  }

  const jd = 365.25 * (c + 4716) + 30.6001 * (e + 1) + day - 1524.5;
  const b = (jd - 2451550.1) / 29.530588853;
  
  return Math.floor((b - Math.floor(b)) * 29.530588853) + 1;
}

// Китайский зодиак
export function getChineseZodiac(year: number): { animal: string; element: string; emoji: string } {
  const animals = [
    { name: 'Крыса', emoji: '🐀' },
    { name: 'Бык', emoji: '🐂' },
    { name: 'Тигр', emoji: '🐅' },
    { name: 'Кролик', emoji: '🐇' },
    { name: 'Дракон', emoji: '🐉' },
    { name: 'Змея', emoji: '🐍' },
    { name: 'Лошадь', emoji: '🐎' },
    { name: 'Коза', emoji: '🐐' },
    { name: 'Обезьяна', emoji: '🐒' },
    { name: 'Петух', emoji: '🐓' },
    { name: 'Собака', emoji: '🐕' },
    { name: 'Свинья', emoji: '🐖' }
  ];

  const elements = ['Дерево', 'Огонь', 'Земля', 'Металл', 'Вода'];

  const animalIndex = (year - 4) % 12;
  const elementIndex = Math.floor(((year - 4) % 10) / 2);

  return {
    animal: animals[animalIndex].name,
    element: elements[elementIndex],
    emoji: animals[animalIndex].emoji
  };
}

// Западный зодиак
export function getWesternZodiac(date: Date): { sign: string; emoji: string; dates: string } {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const signs = [
    { sign: 'Козерог', emoji: '♑', start: [12, 22], end: [1, 19] },
    { sign: 'Водолей', emoji: '♒', start: [1, 20], end: [2, 18] },
    { sign: 'Рыбы', emoji: '♓', start: [2, 19], end: [3, 20] },
    { sign: 'Овен', emoji: '♈', start: [3, 21], end: [4, 19] },
    { sign: 'Телец', emoji: '♉', start: [4, 20], end: [5, 20] },
    { sign: 'Близнецы', emoji: '♊', start: [5, 21], end: [6, 20] },
    { sign: 'Рак', emoji: '♋', start: [6, 21], end: [7, 22] },
    { sign: 'Лев', emoji: '♌', start: [7, 23], end: [8, 22] },
    { sign: 'Дева', emoji: '♍', start: [8, 23], end: [9, 22] },
    { sign: 'Весы', emoji: '♎', start: [9, 23], end: [10, 22] },
    { sign: 'Скорпион', emoji: '♏', start: [10, 23], end: [11, 21] },
    { sign: 'Стрелец', emoji: '♐', start: [11, 22], end: [12, 21] }
  ];

  for (const z of signs) {
    const [startMonth, startDay] = z.start;
    const [endMonth, endDay] = z.end;
    
    if (startMonth === 12 && endMonth === 1) {
      if ((month === 12 && day >= startDay) || (month === 1 && day <= endDay)) {
        return { sign: z.sign, emoji: z.emoji, dates: `${startDay}.${startMonth} - ${endDay}.${endMonth}` };
      }
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return { sign: z.sign, emoji: z.emoji, dates: `${startDay}.${startMonth} - ${endDay}.${endMonth}` };
      }
    }
  }

  return { sign: 'Козерог', emoji: '♑', dates: '22.12 - 19.01' };
}

// Расчёт Пасхи (по Гаусу)
export function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;
  const d = (19 * a + 15) % 30;
  const e = (2 * b + 4 * c + 6 * d + 6) % 7;
  const f = d + e;

  let month = 3;
  let day = 22 + f;

  if (f > 9) {
    month = 4;
    day = f - 9;
  }

  // Добавляем 13 дней для православной Пасхи (юлианский календарь)
  const julianDate = new Date(year, month - 1, day);
  julianDate.setDate(julianDate.getDate() + 13);

  return julianDate;
}

// Праздники России
export function getRussianHolidays(year: number): { date: Date; name: string; type: string }[] {
  const easter = getEasterDate(year);
  
  const holidays = [
    { date: new Date(year, 0, 1), name: 'Новый год', type: 'official' },
    { date: new Date(year, 0, 2), name: 'Новогодние каникулы', type: 'official' },
    { date: new Date(year, 0, 3), name: 'Новогодние каникулы', type: 'official' },
    { date: new Date(year, 0, 4), name: 'Новогодние каникулы', type: 'official' },
    { date: new Date(year, 0, 5), name: 'Новогодние каникулы', type: 'official' },
    { date: new Date(year, 0, 6), name: 'Новогодние каникулы', type: 'official' },
    { date: new Date(year, 0, 7), name: 'Рождество Христово', type: 'official' },
    { date: new Date(year, 0, 8), name: 'Новогодние каникулы', type: 'official' },
    { date: new Date(year, 0, 14), name: 'Старый Новый год', type: 'folk' },
    { date: new Date(year, 0, 25), name: 'Татьянин день', type: 'professional' },
    { date: new Date(year, 1, 14), name: 'День святого Валентина', type: 'folk' },
    { date: new Date(year, 1, 23), name: 'День защитника Отечества', type: 'official' },
    { date: new Date(year, 2, 8), name: 'Международный женский день', type: 'official' },
    { date: new Date(year, 3, 1), name: 'День смеха', type: 'folk' },
    { date: new Date(year, 3, 12), name: 'День космонавтики', type: 'memorial' },
    { date: new Date(year, 4, 1), name: 'Праздник Весны и Труда', type: 'official' },
    { date: new Date(year, 4, 9), name: 'День Победы', type: 'official' },
    { date: new Date(year, 5, 1), name: 'День защиты детей', type: 'memorial' },
    { date: new Date(year, 5, 12), name: 'День России', type: 'official' },
    { date: new Date(year, 5, 22), name: 'День памяти и скорби', type: 'memorial' },
    { date: new Date(year, 6, 8), name: 'День семьи, любви и верности', type: 'folk' },
    { date: new Date(year, 7, 22), name: 'День Государственного флага', type: 'memorial' },
    { date: new Date(year, 8, 1), name: 'День знаний', type: 'professional' },
    { date: new Date(year, 9, 5), name: 'День учителя', type: 'professional' },
    { date: new Date(year, 10, 4), name: 'День народного единства', type: 'official' },
    { date: new Date(year, 11, 12), name: 'День Конституции', type: 'memorial' },
    { date: new Date(year, 11, 31), name: 'Новый год', type: 'official' },
    { date: easter, name: 'Пасха', type: 'religious' },
  ];

  return holidays.sort((a, b) => a.date.getTime() - b.date.getTime());
}

// Именины
export function getNameDays(month: number, day: number): string[] {
  const nameDays: { [key: string]: string[] } = {
    '1-1': ['Илья', 'Григорий', 'Тимофей'],
    '1-2': ['Даниил', 'Иван', 'Игнатий'],
    '1-3': ['Пётр', 'Прокопий', 'Никита'],
    '1-4': ['Анастасия', 'Федор'],
    '1-5': ['Василий', 'Павел', 'Макар'],
    '1-6': ['Евгения', 'Клавдия', 'Николай'],
    '1-7': ['Михаил', 'Валентин'],
    '1-8': ['Григорий', 'Константин', 'Ефим'],
    '1-14': ['Василий', 'Вячеслав', 'Александр', 'Николай', 'Платон', 'Трофим', 'Эмилия', 'Григорий'],
    '1-25': ['Татьяна', 'Пётр', 'Макар'],
    '2-14': ['Трифон', 'Валентин'],
    '2-23': ['Прохор', 'Валентина', 'Галина', 'Анна'],
    '3-8': ['Александр', 'Иван', 'Николай', 'Поликарп'],
    '5-9': ['Глафира', 'Василий', 'Степан'],
    '6-12': ['Исаакий'],
    '11-4': ['Константин', 'Александр', 'Денис', 'Максим', 'Анна', 'Елизавета'],
    '12-31': ['Модест', 'Михаил', 'Вера', 'Зоя'],
  };

  return nameDays[`${month}-${day}`] || [];
}

// Производственный календарь - рабочие/выходные дни
export function getWorkingDays(year: number, month: number): { day: number; isWorking: boolean; isHoliday: boolean; isShortDay: boolean }[] {
  const holidays = getRussianHolidays(year);
  const holidayDates = new Set(holidays.filter(h => h.type === 'official').map(h => h.date.toDateString()));
  
  const days: { day: number; isWorking: boolean; isHoliday: boolean; isShortDay: boolean }[] = [];
  const daysCount = daysInMonth(year, month);
  
  for (let day = 1; day <= daysCount; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = holidayDates.has(date.toDateString());
    const isShortDay = (month === 1 && day === 22) || (month === 2 && day === 7) || (month === 4 && day === 30) || (month === 5 && day === 8) || (month === 5 && day === 11) || (month === 10 && day === 3);
    
    days.push({
      day,
      isWorking: !isWeekend && !isHoliday,
      isHoliday,
      isShortDay
    });
  }
  
  return days;
}

// Время до события
export function getTimeUntil(targetDate: Date): { days: number; hours: number; minutes: number; seconds: number; total: number } {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, total: diff };
}

// Сезоны
export function getSeasonStart(year: number, season: 'spring' | 'summer' | 'autumn' | 'winter'): Date {
  const seasons = {
    spring: new Date(year, 2, 1),
    summer: new Date(year, 5, 1),
    autumn: new Date(year, 8, 1),
    winter: new Date(year, 11, 1)
  };
  return seasons[season];
}

export function getCurrentSeason(date: Date): string {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'Весна';
  if (month >= 5 && month <= 7) return 'Лето';
  if (month >= 8 && month <= 10) return 'Осень';
  return 'Зима';
}

// Добавление дней к дате
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
