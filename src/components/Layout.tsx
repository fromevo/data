import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { TopAd, BottomAd } from './AdBanner';

const navigation = [
  { name: 'Главная', path: '/' },
  { name: 'Дата сегодня', path: '/today' },
  { name: 'Время', path: '/time' },
  { 
    name: 'Календари', 
    children: [
      { name: 'Производственный 2025', path: '/work/2025' },
      { name: 'Производственный 2026', path: '/work/2026' },
      { name: 'Праздники 2025', path: '/holidays/2025' },
      { name: 'Праздники 2026', path: '/holidays/2026' },
      { name: 'Лунный календарь', path: '/lunar' },
      { name: 'Китайский календарь', path: '/china-years' },
    ]
  },
  { name: 'Знаки зодиака', path: '/zodiac' },
  { name: 'Калькуляторы', 
    children: [
      { name: 'Калькулятор дат', path: '/calc' },
      { name: 'Дни между датами', path: '/calc/days-between' },
      { name: 'Именины', path: '/namedays' },
    ]
  },
  { 
    name: 'Таймеры', 
    children: [
      { name: 'Обратный отсчёт', path: '/countdown' },
      { name: 'До произвольной даты', path: '/timer/custom' },
      { name: 'До Нового года', path: '/timer/new-year' },
      { name: 'До 23 февраля', path: '/timer/23-february' },
      { name: 'До 8 марта', path: '/timer/8-march' },
      { name: 'До Дня Победы', path: '/timer/victory-day' },
      { name: 'До Пасхи', path: '/timer/easter' },
      { name: 'До весны', path: '/timer/spring' },
      { name: 'До лета', path: '/timer/summer' },
      { name: 'До осени', path: '/timer/autumn' },
      { name: 'До зимы', path: '/timer/winter' },
    ]
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-3xl">📅</span>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Дата Сегодня
                </span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                item.children ? (
                  <div key={item.name} className="relative">
                    <button
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 hover:bg-gray-100 ${
                        item.children.some(c => location.pathname === c.path) 
                          ? 'text-blue-600' 
                          : 'text-gray-700'
                      }`}
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      onBlur={() => setTimeout(() => setOpenDropdown(null), 200)}
                    >
                      {item.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                              location.pathname === child.path 
                                ? 'text-blue-600 bg-blue-50' 
                                : 'text-gray-700'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                item.children ? (
                  <div key={item.name}>
                    <div className="px-3 py-2 text-sm font-medium text-gray-500">{item.name}</div>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-6 py-2 text-sm rounded-lg ${
                          location.pathname === child.path
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Блок 1: Верхняя реклама (после шапки) */}
      <TopAd />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Блок 3: Нижняя реклама (перед подвалом) */}
      <BottomAd />

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📅</span>
                <span className="text-lg font-bold">Дата Сегодня</span>
              </div>
              <p className="text-gray-400 text-sm">
                Календари, время, праздники и полезные инструменты для работы с датами
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Календари</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/work/2025" className="hover:text-white transition-colors">Производственный 2025</Link></li>
                <li><Link to="/work/2026" className="hover:text-white transition-colors">Производственный 2026</Link></li>
                <li><Link to="/holidays/2025" className="hover:text-white transition-colors">Праздники 2025</Link></li>
                <li><Link to="/lunar" className="hover:text-white transition-colors">Лунный календарь</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Инструменты</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/calc" className="hover:text-white transition-colors">Калькулятор дат</Link></li>
                <li><Link to="/calc/days-between" className="hover:text-white transition-colors">Дни между датами</Link></li>
                <li><Link to="/countdown" className="hover:text-white transition-colors">Обратный отсчёт</Link></li>
                <li><Link to="/zodiac" className="hover:text-white transition-colors">Знаки зодиака</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Таймеры</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/timer/new-year" className="hover:text-white transition-colors">До Нового года</Link></li>
                <li><Link to="/timer/easter" className="hover:text-white transition-colors">До Пасхи</Link></li>
                <li><Link to="/timer/spring" className="hover:text-white transition-colors">До весны</Link></li>
                <li><Link to="/timer/summer" className="hover:text-white transition-colors">До лета</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Дата Сегодня. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
