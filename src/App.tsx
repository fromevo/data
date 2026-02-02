import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TodayPage } from './pages/TodayPage';
import { TimePage } from './pages/TimePage';
import { WorkCalendarPage } from './pages/WorkCalendarPage';
import { HolidaysPage } from './pages/HolidaysPage';
import { LunarPage } from './pages/LunarPage';
import { ChineseYearsPage } from './pages/ChineseYearsPage';
import { ZodiacPage } from './pages/ZodiacPage';
import { CalcPage } from './pages/CalcPage';
import { DaysBetweenPage } from './pages/DaysBetweenPage';
import { CountdownPage } from './pages/CountdownPage';
import { TimerPage } from './pages/TimerPage';
import { NameDaysPage } from './pages/NameDaysPage';

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/work/:year" element={<WorkCalendarPage />} />
          <Route path="/holidays/:year" element={<HolidaysPage />} />
          <Route path="/lunar" element={<LunarPage />} />
          <Route path="/china-years" element={<ChineseYearsPage />} />
          <Route path="/zodiac" element={<ZodiacPage />} />
          <Route path="/calc" element={<CalcPage />} />
          <Route path="/calc/days-between" element={<DaysBetweenPage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/timer/:type" element={<TimerPage />} />
          <Route path="/namedays" element={<NameDaysPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
