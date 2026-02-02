import { Link, useParams } from 'react-router-dom';
import { getRussianHolidays, monthsRu, daysOfWeekRu } from '../utils/dateUtils';

export function HolidaysPage() {
  const { year: yearParam } = useParams();
  const currentYear = new Date().getFullYear();
  const year = yearParam ? parseInt(yearParam) : currentYear;
  
  const holidays = getRussianHolidays(year);
  
  const holidayTypes = {
    official: { name: 'Государственные праздники', color: 'bg-red-500', textColor: 'text-red-600' },
    religious: { name: 'Религиозные праздники', color: 'bg-purple-500', textColor: 'text-purple-600' },
    folk: { name: 'Народные праздники', color: 'bg-green-500', textColor: 'text-green-600' },
    memorial: { name: 'Памятные даты', color: 'bg-blue-500', textColor: 'text-blue-600' },
    professional: { name: 'Профессиональные праздники', color: 'bg-orange-500', textColor: 'text-orange-600' },
  };

  const groupedByMonth = holidays.reduce((acc, h) => {
    const month = h.date.getMonth();
    if (!acc[month]) acc[month] = [];
    acc[month].push(h);
    return acc;
  }, {} as Record<number, typeof holidays>);

  const groupedByType = holidays.reduce((acc, h) => {
    if (!acc[h.type]) acc[h.type] = [];
    acc[h.type].push(h);
    return acc;
  }, {} as Record<string, typeof holidays>);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          🎉 Праздники России {year}
        </h1>
        <p className="text-gray-500">Государственные, народные и религиозные праздники</p>
        
        {/* Year navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {[currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map(y => (
            <Link
              key={y}
              to={`/holidays/${y}`}
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(holidayTypes).map(([type, info]) => (
          <div key={type} className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className={`text-2xl font-bold ${info.textColor}`}>
              {groupedByType[type]?.length || 0}
            </div>
            <div className="text-xs text-gray-500 mt-1">{info.name}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(holidayTypes).map(([type, info]) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${info.color}`}></div>
            <span className="text-sm text-gray-600">{info.name}</span>
          </div>
        ))}
      </div>

      {/* Calendar View by Month */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }, (_, month) => {
          const monthHolidays = groupedByMonth[month] || [];
          if (monthHolidays.length === 0) return null;
          
          return (
            <div key={month} className="bg-white rounded-xl p-5 shadow-sm border">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">{monthsRu[month]}</h3>
              <div className="space-y-3">
                {monthHolidays.map((holiday, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${holidayTypes[holiday.type as keyof typeof holidayTypes]?.color || 'bg-gray-400'}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{holiday.name}</div>
                      <div className="text-sm text-gray-500">
                        {holiday.date.getDate()} {monthsRu[holiday.date.getMonth()].toLowerCase()}, {daysOfWeekRu[holiday.date.getDay()].toLowerCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full List by Type */}
      <div className="space-y-6">
        {Object.entries(holidayTypes).map(([type, info]) => {
          const typeHolidays = groupedByType[type];
          if (!typeHolidays || typeHolidays.length === 0) return null;
          
          return (
            <div key={type} className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${info.textColor}`}>
                <div className={`w-3 h-3 rounded-full ${info.color}`}></div>
                {info.name}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typeHolidays.map((holiday, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">{holiday.name}</div>
                    <div className="text-sm text-gray-500">
                      {holiday.date.toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long',
                        weekday: 'long'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">О праздниках</h3>
        <div className="text-blue-800 text-sm space-y-2">
          <p>
            <strong>Государственные праздники</strong> — официальные нерабочие дни, установленные законодательством РФ.
          </p>
          <p>
            <strong>Религиозные праздники</strong> — православные праздники, имеющие важное значение для верующих.
          </p>
          <p>
            <strong>Народные праздники</strong> — традиционные праздники, отмечаемые в народе.
          </p>
          <p>
            <strong>Памятные даты</strong> — важные исторические даты и события.
          </p>
        </div>
      </div>
    </div>
  );
}
