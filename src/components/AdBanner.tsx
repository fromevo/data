import YandexAd from './YandexAd';

// ==========================================
// ⚠️ ВАЖНО: Замените ID на ваши реальные ID 
// из личного кабинета РСЯ (partner2.yandex.ru)
// 
// Формат ID: R-A-XXXXXXX-X
// Где XXXXXXX - номер вашей площадки
// ==========================================

const AD_BLOCKS = {
  // Блок 1: Верхний баннер (после шапки)
  TOP: 'R-A-XXXXXXX-1',
  
  // Блок 2: Первый средний баннер (внутри контента)
  MIDDLE_1: 'R-A-XXXXXXX-2',
  
  // Блок 3: Второй средний баннер (внутри контента)
  MIDDLE_2: 'R-A-XXXXXXX-3',
  
  // Блок 4: Нижний баннер (перед подвалом)
  BOTTOM: 'R-A-XXXXXXX-4',
};

// ==========================================
// Блок 1: Верхний баннер (после шапки)
// Показывается на всех устройствах
// ==========================================
export function TopAd() {
  return (
    <div className="w-full py-3 bg-gray-50/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-[10px] text-gray-400 text-center mb-1"></p>
        <div className="flex justify-center">
          <YandexAd 
            blockId={AD_BLOCKS.TOP} 
            className="w-full max-w-[728px]"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Блок 2: Первый средний баннер (внутри контента)
// Используйте в начале страницы после заголовка
// ==========================================
export function MiddleAd1() {
  return (
    <div className="w-full my-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-[10px] text-gray-400 text-center mb-2"></p>
        <div className="flex justify-center">
          <YandexAd 
            blockId={AD_BLOCKS.MIDDLE_1} 
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Блок 3: Второй средний баннер (внутри контента)
// Используйте в середине или конце контента
// ==========================================
export function MiddleAd2() {
  return (
    <div className="w-full my-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-[10px] text-gray-400 text-center mb-2"></p>
        <div className="flex justify-center">
          <YandexAd 
            blockId={AD_BLOCKS.MIDDLE_2} 
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Блок 4: Нижний баннер (перед подвалом)
// Показывается на всех устройствах
// ==========================================
export function BottomAd() {
  return (
    <div className="w-full py-4 bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-[10px] text-gray-400 text-center mb-2"></p>
        <div className="flex justify-center">
          <YandexAd 
            blockId={AD_BLOCKS.BOTTOM} 
            className="w-full max-w-[970px]"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Универсальный компонент MiddleAd (алиас для MiddleAd1)
// Для обратной совместимости
// ==========================================
export function MiddleAd() {
  return <MiddleAd1 />;
}

// ==========================================
// Универсальный компонент с выбором позиции
// ==========================================
interface AdBannerProps {
  position: 'top' | 'middle1' | 'middle2' | 'bottom';
}

export default function AdBanner({ position }: AdBannerProps) {
  switch (position) {
    case 'top':
      return <TopAd />;
    case 'middle1':
      return <MiddleAd1 />;
    case 'middle2':
      return <MiddleAd2 />;
    case 'bottom':
      return <BottomAd />;
    default:
      return null;
  }
}

// Экспорт для удобства
export { AD_BLOCKS };
