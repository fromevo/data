import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  monthsRu, daysOfWeekShortRu, daysInMonth, getRussianHolidays 
} from '../utils/dateUtils';

export function WorkCalendarPage() {
  const { year: yearParam } = useParams();
  const currentYear = new Date().getFullYear();
  const year = yearParam ? parseInt(yearParam) : currentYear;
  
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  
  const holidays = getRussianHolidays(year);
  const holidayDates = new Set(
    holidays.filter(h => h.type === 'official').map(h => h.date.toDateString())
  );

  // Calculate working days statistics
  const calculateStats = () => {
    let workDays = 0;
    let weekends = 0;
    let holidayCount = 0;
    
    for (let month = 0; month < 12; month++) {
      const days = daysInMonth(year, month);
      for (let day = 1; day <= days; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();
        const isHoliday = holidayDates.has(date.toDateString());
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        if (isHoliday) {
          holidayCount++;
        } else if (isWeekend) {
          weekends++;
        } else {
          workDays++;
        }
      }
    }
    
    return { workDays, weekends, holidayCount, total: workDays + weekends + holidayCount };
  };

  const stats = calculateStats();

  const getMonthStats = (month: number) => {
    const days = daysInMonth(year, month);
    let workDays = 0;
    let weekends = 0;
    let holidayCount = 0;
    
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const isHoliday = holidayDates.has(date.toDateString());
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      if (isHoliday) {
        holidayCount++;
      } else if (isWeekend) {
        weekends++;
      } else {
        workDays++;
      }
    }
    
    return { workDays, weekends, holidayCount, total: days };
  };

  const renderCalendar = (month: number) => {
    const days = daysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Start from Monday
    
    const cells = [];
    
    // Empty cells before first day
    for (let i = 0; i < adjustedFirstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-8"></div>);
    }
    
    // Days
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const isToday = date.toDateString() === new Date().toDateString();
      const isHoliday = holidayDates.has(date.toDateString());
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let bgColor = 'bg-green-100 text-green-800';
      if (isHoliday) {
        bgColor = 'bg-red-100 text-red-600';
      } else if (isWeekend) {
        bgColor = 'bg-orange-100 text-orange-600';
      }
      
      cells.push(
        <div
          key={day}
          className={`h-8 flex items-center justify-center text-sm font-medium rounded ${bgColor} ${
            isToday ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          {day}
        </div>
      );
    }
    
    return cells;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Производственный календарь {year}
        </h1>
        <p className="text-gray-500">Рабочие дни, выходные и праздники</p>
        
        {/* Year navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {[currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map(y => (
            <Link
              key={y}
              to={`/work/${y}`}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                y === year 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {y}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-green-600">{stats.workDays}</div>
          <div className="text-sm text-gray-500">Рабочих дней</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-orange-600">{stats.weekends}</div>
          <div className="text-sm text-gray-500">Выходных</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-red-600">{stats.holidayCount}</div>
          <div className="text-sm text-gray-500">Праздничных</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-500">Всего дней</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-green-100"></div>
          <span className="text-sm">Рабочий день</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-orange-100"></div>
          <span className="text-sm">Выходной</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-red-100"></div>
          <span className="text-sm">Праздник</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded ring-2 ring-blue-500"></div>
          <span className="text-sm">Сегодня</span>
        </div>
      </div>

      {/* Calendars */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }, (_, month) => {
          const monthStats = getMonthStats(month);
          return (
            <div 
              key={month} 
              className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition hover:shadow-md ${
                selectedMonth === month ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedMonth(selectedMonth === month ? null : month)}
            >
              <h3 className="font-semibold text-gray-900 mb-3">{monthsRu[month]}</h3>
              
              {/* Week days header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => (
                  <div key={d} className="h-6 flex items-center justify-center text-xs text-gray-500">
                    {d}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar(month)}
              </div>
              
              {/* Month stats */}
              <div className="mt-3 pt-3 border-t text-xs text-gray-500 flex justify-between">
                <span>Раб: {monthStats.workDays}</span>
                <span>Вых: {monthStats.weekends}</span>
                <span>Праз: {monthStats.holidayCount}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quarterly Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Статистика по кварталам</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Квартал</th>
                <th className="text-center py-2 px-4">Месяцы</th>
                <th className="text-center py-2 px-4">Рабочих</th>
                <th className="text-center py-2 px-4">Выходных</th>
                <th className="text-center py-2 px-4">Праздников</th>
                <th className="text-center py-2 px-4">Всего</th>
              </tr>
            </thead>
            <tbody>
              {[
                { q: 1, months: [0, 1, 2], name: 'I квартал' },
                { q: 2, months: [3, 4, 5], name: 'II квартал' },
                { q: 3, months: [6, 7, 8], name: 'III квартал' },
                { q: 4, months: [9, 10, 11], name: 'IV квартал' },
              ].map(quarter => {
                const qStats = quarter.months.reduce(
                  (acc, m) => {
                    const ms = getMonthStats(m);
                    return {
                      workDays: acc.workDays + ms.workDays,
                      weekends: acc.weekends + ms.weekends,
                      holidayCount: acc.holidayCount + ms.holidayCount,
                      total: acc.total + ms.total
                    };
                  },
                  { workDays: 0, weekends: 0, holidayCount: 0, total: 0 }
                );
                
                return (
                  <tr key={quarter.q} className="border-b">
                    <td className="py-2 px-4 font-medium">{quarter.name}</td>
                    <td className="text-center py-2 px-4 text-gray-500">
                      {quarter.months.map(m => monthsRu[m].slice(0, 3)).join(', ')}
                    </td>
                    <td className="text-center py-2 px-4 text-green-600 font-medium">{qStats.workDays}</td>
                    <td className="text-center py-2 px-4 text-orange-600">{qStats.weekends}</td>
                    <td className="text-center py-2 px-4 text-red-600">{qStats.holidayCount}</td>
                    <td className="text-center py-2 px-4 font-medium">{qStats.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Holidays List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Праздничные дни {year}</h3>
        <div className="space-y-2">
          {holidays.filter(h => h.type === 'official').map((holiday, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <div className="w-24 text-sm text-gray-500">
                {holiday.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </div>
              <div className="text-sm text-gray-500">
                {daysOfWeekShortRu[holiday.date.getDay()]}
              </div>
              <div className="font-medium">{holiday.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
