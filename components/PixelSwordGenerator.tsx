import React, { useState, useEffect, useCallback } from 'react';
import { BLADES, GUARDS, HILTS, POMMELS } from '../constants/swordParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type SwordPart = string[];

interface Sword {
  bladeIndex: number;
  guardIndex: number;
  hiltIndex: number;
  pommelIndex: number;
}

const getRandomIndex = <T,>(arr: T[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const combinePartsVertically = (parts: SwordPart[]): SwordPart => {
  const allRows = parts.flat();
  if (allRows.length === 0) {
    return [];
  }

  const maxCharWidth = Math.max(0, ...allRows.map(row => row.length));

  return allRows.map(row => {
    const padding = maxCharWidth - row.length;
    const leftPadding = Math.floor(padding / 2);
    const rightPadding = padding - leftPadding;
    return ' '.repeat(leftPadding) + row + ' '.repeat(rightPadding);
  });
};

const PartSelector = ({ title, parts, selectedIndex, onSelect }: { title: string, parts: SwordPart[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-xl mb-3 font-bold text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {parts.map((part, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-indigo-500 ${
            selectedIndex === index ? 'bg-indigo-200 dark:bg-indigo-800' : 'bg-gray-200 dark:bg-gray-800'
          }`}
          aria-label={`${title} ${index + 1}`}
        >
           <div className={`border-2 rounded-sm transition-colors ${selectedIndex === index ? 'border-indigo-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
            <PixelArtDisplay part={part} size="sm" />
          </div>
        </button>
      ))}
    </div>
  </div>
);


export const PixelSwordGenerator: React.FC = () => {
  const [bladeIndex, setBladeIndex] = useState(0);
  const [guardIndex, setGuardIndex] = useState(0);
  const [hiltIndex, setHiltIndex] = useState(0);
  const [pommelIndex, setPommelIndex] = useState(0);
  const [currentSword, setCurrentSword] = useState<SwordPart>([]);
  const [savedSwords, setSavedSwords] = useState<Sword[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixel-swords');
      if (saved) {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData) && parsedData.every(item => 'bladeIndex' in item)) {
            setSavedSwords(parsedData);
        } else {
            localStorage.removeItem('pixel-swords');
        }
      }
    } catch (error) {
      console.error("Failed to load saved swords:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pixel-swords', JSON.stringify(savedSwords));
    } catch (error) {
      console.error("Failed to save swords:", error);
    }
  }, [savedSwords]);

  const generateRandomSword = useCallback(() => {
    setBladeIndex(getRandomIndex(BLADES));
    setGuardIndex(getRandomIndex(GUARDS));
    setHiltIndex(getRandomIndex(HILTS));
    setPommelIndex(getRandomIndex(POMMELS));
  }, []);

  const buildSword = useCallback((sword: Sword) => {
    return combinePartsVertically([
        BLADES[sword.bladeIndex],
        GUARDS[sword.guardIndex],
        HILTS[sword.hiltIndex],
        POMMELS[sword.pommelIndex],
    ]);
  }, []);

  useEffect(() => {
    const combined = buildSword({ bladeIndex, guardIndex, hiltIndex, pommelIndex });
    setCurrentSword(combined);
  }, [bladeIndex, guardIndex, hiltIndex, pommelIndex, buildSword]);

  useEffect(() => {
    generateRandomSword();
  }, [generateRandomSword]);

  const handleSaveSword = () => {
    const newSword: Sword = { bladeIndex, guardIndex, hiltIndex, pommelIndex };
    const isDuplicate = savedSwords.some(s => 
        s.bladeIndex === newSword.bladeIndex &&
        s.guardIndex === newSword.guardIndex &&
        s.hiltIndex === newSword.hiltIndex &&
        s.pommelIndex === newSword.pommelIndex
    );
    if (!isDuplicate) {
      setSavedSwords([...savedSwords, newSword]);
    } else {
        alert("Kiếm này đã được lưu rồi!");
    }
  };

  const handleDeleteSword = (indexToDelete: number) => {
    setSavedSwords(savedSwords.filter((_, index) => index !== indexToDelete));
  };

  const handleLoadSword = (sword: Sword) => {
    setBladeIndex(sword.bladeIndex);
    setGuardIndex(sword.guardIndex);
    setHiltIndex(sword.hiltIndex);
    setPommelIndex(sword.pommelIndex);
  };
  
  const getCanvasForSword = (swordParts: SwordPart, pixelSize: number): HTMLCanvasElement | null => {
    const canvasColorMap: { [key: string]: string } = {
        'S': '#d1d5db', // silver/steel - slate-300
        '#': '#64748b', // dark silver/steel shadow - slate-500
        '$': '#020617', // outline - slate-900
        'w': '#ffffff',
        'b': '#a16207', 'B': '#854d0e', 'n': '#b45309', // browns
        '3': '#ef4444', '4': '#b91c1c', // red gem
        'x': '#374151', // pet black for skull
        '0': '#facc15', 'Y': '#eab308', // gold
    };

    const allRows = swordParts;
    if (allRows.length === 0) return null;
    
    const maxCharWidth = allRows.length > 0 ? allRows[0].length : 0;
    const totalCharHeight = allRows.length;
    
    const canvas = document.createElement('canvas');
    canvas.width = maxCharWidth * pixelSize;
    canvas.height = totalCharHeight * pixelSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    allRows.forEach((rowStr, rowIndex) => {
        rowStr.split('').forEach((pixel, colIndex) => {
            if (canvasColorMap[pixel]) {
                ctx.fillStyle = canvasColorMap[pixel];
                ctx.fillRect(colIndex * pixelSize, rowIndex * pixelSize, pixelSize, pixelSize);
            }
        });
    });
    return canvas;
  }

  const handleDownloadSingle = () => {
    const combinedParts = combinePartsVertically([
        BLADES[bladeIndex],
        GUARDS[guardIndex],
        HILTS[hiltIndex],
        POMMELS[pommelIndex],
    ]);
    const canvas = getCanvasForSword(combinedParts, 20);
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pixel-sword.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  const handleDownloadAll = () => {
    if (savedSwords.length === 0) return;

    const PIXEL_SIZE_SMALL = 4;
    const PADDING = 20;
    const SWORDS_PER_ROW = 10;

    const swordsData = savedSwords.map(sword => {
        const combinedParts = combinePartsVertically([
            BLADES[sword.bladeIndex], 
            GUARDS[sword.guardIndex], 
            HILTS[sword.hiltIndex], 
            POMMELS[sword.pommelIndex],
        ]);
        return getCanvasForSword(combinedParts, PIXEL_SIZE_SMALL);
    }).filter((c): c is HTMLCanvasElement => c !== null);

    if (swordsData.length === 0) return;
    
    const maxSwordWidth = Math.max(0, ...swordsData.map(c => c.width));
    const maxSwordHeight = Math.max(0, ...swordsData.map(c => c.height));

    const cellWidth = maxSwordWidth + PADDING;
    const cellHeight = maxSwordHeight + PADDING;

    const numRows = Math.ceil(savedSwords.length / SWORDS_PER_ROW);
    const numCols = Math.min(savedSwords.length, SWORDS_PER_ROW);

    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = numCols * cellWidth - PADDING;
    mainCanvas.height = numRows * cellHeight - PADDING;
    const ctx = mainCanvas.getContext('2d');
    if (!ctx) return;

    swordsData.forEach((swordCanvas, index) => {
        const gridX = index % SWORDS_PER_ROW;
        const gridY = Math.floor(index / SWORDS_PER_ROW);
        const canvasX = gridX * cellWidth;
        const canvasY = gridY * cellHeight;
        const xOffset = (maxSwordWidth - swordCanvas.width) / 2;
        const yOffset = (maxSwordHeight - swordCanvas.height) / 2;
        ctx.drawImage(swordCanvas, canvasX + xOffset, canvasY + yOffset);
    });

    const link = document.createElement('a');
    link.download = 'pixel-swords_collection.png';
    link.href = mainCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <section className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-8 min-h-[300px] flex items-center justify-center">
        <PixelArtDisplay part={currentSword} />
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        <button onClick={generateRandomSword} className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tạo Ngẫu Nhiên</button>
        <button onClick={handleSaveSword} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Lưu Kiếm</button>
        <button onClick={handleDownloadSingle} className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tải PNG</button>
      </section>

      <div>
        <PartSelector title="Lưỡi Kiếm" parts={BLADES} selectedIndex={bladeIndex} onSelect={setBladeIndex} />
        <PartSelector title="Tấm Chắn" parts={GUARDS} selectedIndex={guardIndex} onSelect={setGuardIndex} />
        <PartSelector title="Cán Kiếm" parts={HILTS} selectedIndex={hiltIndex} onSelect={setHiltIndex} />
        <PartSelector title="Chuôi Kiếm" parts={POMMELS} selectedIndex={pommelIndex} onSelect={setPommelIndex} />
      </div>

      {savedSwords.length > 0 && (
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Kiếm Đã Lưu</h2>
            <button
              onClick={handleDownloadAll}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-sm"
            >
              Tải Tất Cả
            </button>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {savedSwords.map((sword, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadSword(sword)}>
                <div className="bg-gray-300 dark:bg-gray-700 rounded-md p-1">
                    <PixelArtDisplay part={buildSword(sword)} size="sm" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSword(index);
                  }}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold leading-none pb-1"
                  aria-label="Xóa kiếm"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};