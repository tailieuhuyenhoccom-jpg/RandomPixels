import React, { useState } from 'react';
import { PixelRocketGenerator } from './components/PixelRocketGenerator';
import { PixelTreeGenerator } from './components/PixelTreeGenerator';
import { PixelLollipopGenerator } from './components/PixelLollipopGenerator';
import { PixelSwordGenerator } from './components/PixelSwordGenerator';
import { PixelCloudGenerator } from './components/PixelCloudGenerator';
import { PixelPyramidGenerator } from './components/PixelPyramidGenerator';
import { PixelHouseGenerator } from './components/PixelHouseGenerator';
import { PixelPlanetGenerator } from './components/PixelPlanetGenerator';
import { PixelFlowerGenerator } from './components/PixelFlowerGenerator';

const App: React.FC = () => {
  const [activeGenerator, setActiveGenerator] = useState<'tree' | 'rocket' | 'lollipop' | 'sword' | 'cloud' | 'pyramid' | 'house' | 'planet' | 'flower'>('tree');

  const getHeader = () => {
    switch (activeGenerator) {
      case 'tree':
        return {
          title: 'Cây Pixel',
          subtitle: 'Tạo ra những cây pixel độc đáo của riêng bạn!',
          color: 'text-green-600',
        };
      case 'rocket':
        return {
          title: 'Tên Lửa Pixel',
          subtitle: 'Tạo ra những tên lửa pixel độc đáo của riêng bạn!',
          color: 'text-red-500',
        };
      case 'lollipop':
        return {
          title: 'Kẹo mút Pixel',
          subtitle: 'Tạo ra những cây kẹo mút pixel ngọt ngào của riêng bạn!',
          color: 'text-pink-500',
        };
      case 'sword':
        return {
          title: 'Kiếm Pixel',
          subtitle: 'Rèn những thanh kiếm pixel huyền thoại của riêng bạn!',
          color: 'text-indigo-500',
        };
      case 'cloud':
        return {
          title: 'Mây Pixel',
          subtitle: 'Tạo ra những đám mây pixel đáng yêu của riêng bạn!',
          color: 'text-sky-500',
        };
      case 'pyramid':
        return {
          title: 'Kim tự tháp Pixel',
          subtitle: 'Xây dựng các kim tự tháp pixel cổ đại của riêng bạn!',
          color: 'text-amber-500',
        };
      case 'house':
        return {
          title: 'Nhà Pixel',
          subtitle: 'Xây dựng ngôi nhà pixel trong mơ của bạn!',
          color: 'text-blue-500',
        };
      case 'planet':
        return {
          title: 'Hành tinh Pixel',
          subtitle: 'Tạo ra các hệ hành tinh pixel của riêng bạn!',
          color: 'text-purple-500',
        };
      case 'flower':
        return {
          title: 'Hoa Pixel',
          subtitle: 'Tạo ra những bông hoa pixel xinh đẹp của riêng bạn!',
          color: 'text-rose-500',
        };
      default:
        return { title: '', subtitle: '', color: '' };
    }
  };

  const { title, subtitle, color } = getHeader();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold ${color}`}>{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
        </header>

        <nav className="flex justify-center flex-wrap mb-8 gap-2 md:space-x-4">
          <button
            onClick={() => setActiveGenerator('tree')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'tree'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Cây Pixel
          </button>
          <button
            onClick={() => setActiveGenerator('rocket')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'rocket'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Tên Lửa Pixel
          </button>
          <button
            onClick={() => setActiveGenerator('lollipop')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'lollipop'
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Kẹo mút Pixel
          </button>
          <button
            onClick={() => setActiveGenerator('sword')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'sword'
                ? 'bg-indigo-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Kiếm Pixel
          </button>
           <button
            onClick={() => setActiveGenerator('cloud')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'cloud'
                ? 'bg-sky-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Mây Pixel
          </button>
          <button
            onClick={() => setActiveGenerator('pyramid')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'pyramid'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            KTT Pixel
          </button>
          <button
            onClick={() => setActiveGenerator('house')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'house'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Nhà Pixel
          </button>
          <button
            onClick={() => setActiveGenerator('planet')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'planet'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Hành tinh Pixel
          </button>
          <button
            onClick={() => setActiveGenerator('flower')}
            className={`py-2 px-4 md:px-6 rounded-lg font-semibold transition-colors ${
              activeGenerator === 'flower'
                ? 'bg-rose-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Hoa Pixel
          </button>
        </nav>

        <div>
          {activeGenerator === 'tree' && <PixelTreeGenerator />}
          {activeGenerator === 'rocket' && <PixelRocketGenerator />}
          {activeGenerator === 'lollipop' && <PixelLollipopGenerator />}
          {activeGenerator === 'sword' && <PixelSwordGenerator />}
          {activeGenerator === 'cloud' && <PixelCloudGenerator />}
          {activeGenerator === 'pyramid' && <PixelPyramidGenerator />}
          {activeGenerator === 'house' && <PixelHouseGenerator />}
          {activeGenerator === 'planet' && <PixelPlanetGenerator />}
          {activeGenerator === 'flower' && <PixelFlowerGenerator />}
        </div>
        
        <footer className="text-center text-gray-500 dark:text-gray-400 mt-12 py-4">
          Phát triển bởi Nguyễn Thành Đạt
        </footer>
      </main>
    </div>
  );
};

export default App;
