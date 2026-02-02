import { useEffect, useRef } from 'react';

interface YandexAdProps {
  blockId: string;
  className?: string;
}

// Расширяем типы window для Яндекс рекламы
declare global {
  interface Window {
    yaContextCb: Array<() => void>;
    Ya?: {
      Context: {
        AdvManager: {
          render: (config: {
            blockId: string;
            renderTo: string;
            type?: string;
          }) => void;
        };
      };
    };
  }
}

export default function YandexAd({ blockId, className = '' }: YandexAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    // Предотвращаем повторный рендер
    if (renderedRef.current) return;
    
    // Проверяем что blockId валидный (не placeholder)
    if (blockId.includes('XXXXXXX')) {
      console.log('YandexAd: Замените blockId на реальный ID из РСЯ');
      return;
    }

    renderedRef.current = true;

    // Инициализируем массив callback'ов если его нет
    window.yaContextCb = window.yaContextCb || [];

    // Добавляем callback для рендера рекламы
    window.yaContextCb.push(() => {
      if (window.Ya && containerRef.current) {
        window.Ya.Context.AdvManager.render({
          blockId: blockId,
          renderTo: `yandex_rtb_${blockId}`,
        });
      }
    });

    // Загружаем скрипт Яндекса если его ещё нет
    const existingScript = document.querySelector(
      'script[src*="context.js"]'
    );
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://yandex.ru/ads/system/context.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [blockId]);

  // Показываем placeholder если ID не настроен
  if (blockId.includes('XXXXXXX')) {
    return (
      <div className={`yandex-ad-placeholder ${className}`}>
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400">
          <p className="text-sm">📢 Рекламный блок</p>
          <p className="text-xs mt-1">ID: {blockId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`yandex-ad-container ${className}`}>
      <div 
        id={`yandex_rtb_${blockId}`} 
        ref={containerRef}
      />
    </div>
  );
}
