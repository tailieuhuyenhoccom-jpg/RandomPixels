import React, { useState, useEffect, useCallback } from 'react';
import { NOSE_CONES, BODIES, FINS, FLAMES } from '../constants/rocketParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type RocketPart = string[];

interface Rocket {
  noseConeIndex: number;
  bodyIndex: number;
  finIndex: number;
  flameIndex: number;
}

const getRandomIndex = <T,>(arr: T[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const combinePartsVertically = (parts: RocketPart[]): RocketPart => {
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

const PartSelector = ({ title, parts, selectedIndex, onSelect }: { title: string, parts: RocketPart[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-xl mb-3 font-bold text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {parts.map((part, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-red-500 ${
            selectedIndex === index ? 'bg-red-200 dark:bg-red-800' : 'bg-gray-200 dark:bg-gray-800'
          }`}
          aria-label={`${title} ${index + 1}`}
        >
           <div className={`border-2 rounded-sm transition-colors ${selectedIndex === index ? 'border-red-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
            <PixelArtDisplay part={part} size="sm" />
          </div>
        </button>
      ))}
    </div>
  </div>
);


export const PixelRocketGenerator: React.FC = () => {
  const [noseConeIndex, setNoseConeIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [finIndex, setFinIndex] = useState(0);
  const [flameIndex, setFlameIndex] = useState(0);
  const [currentRocket, setCurrentRocket] = useState<RocketPart>([]);
  const [savedRockets, setSavedRockets] = useState<Rocket[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixel-rockets');
      if (saved) {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData) && parsedData.every(item => 'noseConeIndex' in item)) {
            setSavedRockets(parsedData);
        } else {
            localStorage.removeItem('pixel-rockets');
        }
      }
    } catch (error) {
      console.error("Failed to load saved rockets:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pixel-rockets', JSON.stringify(savedRockets));
    } catch (error) {
      console.error("Failed to save rockets:", error);
    }
  }, [savedRockets]);

  const generateRandomRocket = useCallback(() => {
    setNoseConeIndex(getRandomIndex(NOSE_CONES));
    setBodyIndex(getRandomIndex(BODIES));
    setFinIndex(getRandomIndex(FINS));
    setFlameIndex(getRandomIndex(FLAMES));
  }, []);

  const buildRocket = useCallback((rocket: Rocket) => {
    return combinePartsVertically([
        NOSE_CONES[rocket.noseConeIndex],
        BODIES[rocket.bodyIndex],
        FINS[rocket.finIndex],
        FLAMES[rocket.flameIndex],
    ]);
  }, []);

  useEffect(() => {
    const combined = buildRocket({ noseConeIndex, bodyIndex, finIndex, flameIndex });
    setCurrentRocket(combined);
  }, [noseConeIndex, bodyIndex, finIndex, flameIndex, buildRocket]);

  useEffect(() => {
    generateRandomRocket();
  }, [generateRandomRocket]);

  const handleSaveRocket = () => {
    const newRocket: Rocket = { noseConeIndex, bodyIndex, finIndex, flameIndex };
    const isDuplicate = savedRockets.some(t => 
        t.noseConeIndex === newRocket.noseConeIndex &&
        t.bodyIndex === newRocket.bodyIndex &&
        t.finIndex === newRocket.finIndex &&
        t.flameIndex === newRocket.flameIndex
    );
    if (!isDuplicate) {
      setSavedRockets([...savedRockets, newRocket]);
    } else {
        alert("Tên lửa này đã được lưu rồi!");
    }
  };

  const handleDeleteRocket = (indexToDelete: number) => {
    setSavedRockets(savedRockets.filter((_, index) => index !== indexToDelete));
  };

  const handleLoadRocket = (rocket: Rocket) => {
    setNoseConeIndex(rocket.noseConeIndex);
    setBodyIndex(rocket.bodyIndex);
    setFinIndex(rocket.finIndex);
    setFlameIndex(rocket.flameIndex);
  };
  
  const getCanvasForRocket = (rocketParts: RocketPart, pixelSize: number, withBackground: boolean): HTMLCanvasElement | null => {
    const canvasColorMap: { [key: string]: string } = {
        '1': '#9ca3af', '2': '#4b5563', 'w': '#ffffff', '7': '#111827',
        '3': '#ef4444', '4': '#b91c1c', '5': '#3b82f6', '6': '#1d4ed8',
        '8': '#f97316', '9': '#c2410c', '0': '#facc15', '!': '#fde047',
    };

    const allRows = rocketParts;
    if (allRows.length === 0) return null;
    
    const maxCharWidth = allRows.length > 0 ? allRows[0].length : 0;
    const totalCharHeight = allRows.length;
    
    const canvas = document.createElement('canvas');
    canvas.width = maxCharWidth * pixelSize;
    canvas.height = totalCharHeight * pixelSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    if (withBackground) {
      ctx.fillStyle = '#111827'; // Dark background for space theme
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

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
        NOSE_CONES[noseConeIndex],
        BODIES[bodyIndex],
        FINS[finIndex],
        FLAMES[flameIndex],
    ]);
    const canvas = getCanvasForRocket(combinedParts, 20, false);
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pixel-rocket.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  const handleDownloadAll = () => {
    if (savedRockets.length === 0) return;

    const PIXEL_SIZE_SMALL = 4;
    const PADDING = 20;
    const ROCKETS_PER_ROW = 10;

    const rocketsData = savedRockets.map(rocket => {
        const combinedParts = combinePartsVertically([
            NOSE_CONES[rocket.noseConeIndex], 
            BODIES[rocket.bodyIndex], 
            FINS[rocket.finIndex], 
            FLAMES[rocket.flameIndex],
        ]);
        return getCanvasForRocket(combinedParts, PIXEL_SIZE_SMALL, false);
    }).filter((c): c is HTMLCanvasElement => c !== null);

    if (rocketsData.length === 0) return;
    
    const maxRocketWidth = Math.max(0, ...rocketsData.map(c => c.width));
    const maxRocketHeight = Math.max(0, ...rocketsData.map(c => c.height));

    const cellWidth = maxRocketWidth + PADDING;
    const cellHeight = maxRocketHeight + PADDING;

    const numRows = Math.ceil(savedRockets.length / ROCKETS_PER_ROW);
    const numCols = Math.min(savedRockets.length, ROCKETS_PER_ROW);

    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = numCols * cellWidth - PADDING;
    mainCanvas.height = numRows * cellHeight - PADDING;
    const ctx = mainCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#111827'; // Dark background for space theme
    ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

    rocketsData.forEach((rocketCanvas, index) => {
        const gridX = index % ROCKETS_PER_ROW;
        const gridY = Math.floor(index / ROCKETS_PER_ROW);
        const canvasX = gridX * cellWidth;
        const canvasY = gridY * cellHeight;
        const xOffset = (maxRocketWidth - rocketCanvas.width) / 2;
        const yOffset = (maxRocketHeight - rocketCanvas.height) / 2;
        ctx.drawImage(rocketCanvas, canvasX + xOffset, canvasY + yOffset);
    });

    const link = document.createElement('a');
    link.download = 'pixel-rockets_collection.png';
    link.href = mainCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <section className="bg-gray-800 rounded-lg p-4 mb-8 min-h-[300px] flex items-center justify-center">
        <PixelArtDisplay part={currentRocket} />
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        <button onClick={generateRandomRocket} className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tạo Ngẫu Nhiên</button>
        <button onClick={handleSaveRocket} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Lưu Tên Lửa</button>
        <button onClick={handleDownloadSingle} className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tải PNG</button>
      </section>

      <div>
        <PartSelector title="Đầu Tên Lửa" parts={NOSE_CONES} selectedIndex={noseConeIndex} onSelect={setNoseConeIndex} />
        <PartSelector title="Thân Tên Lửa" parts={BODIES} selectedIndex={bodyIndex} onSelect={setBodyIndex} />
        <PartSelector title="Đuôi Tên Lửa" parts={FINS} selectedIndex={finIndex} onSelect={setFinIndex} />
        <PartSelector title="Tia Lửa" parts={FLAMES} selectedIndex={flameIndex} onSelect={setFlameIndex} />
      </div>

      {savedRockets.length > 0 && (
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Tên Lửa Đã Lưu</h2>
            <button
              onClick={handleDownloadAll}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-sm"
            >
              Tải Tất Cả
            </button>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {savedRockets.map((rocket, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadRocket(rocket)}>
                <div className="bg-gray-700 rounded-md p-1">
                    <PixelArtDisplay part={buildRocket(rocket)} size="sm" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRocket(index);
                  }}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold leading-none pb-1"
                  aria-label="Xóa tên lửa"
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