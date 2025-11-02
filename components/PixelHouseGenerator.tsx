import React, { useState, useEffect, useCallback } from 'react';
import { ROOFS, WALLS, FOUNDATIONS, YARDS } from '../constants/houseParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type HousePart = string[];

interface House {
  roofIndex: number;
  wallIndex: number;
  foundationIndex: number;
  yardIndex: number;
}

const getRandomIndex = <T,>(arr: T[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const combinePartsVertically = (parts: HousePart[]): HousePart => {
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

const PartSelector = ({ title, parts, selectedIndex, onSelect }: { title: string, parts: HousePart[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-xl mb-3 font-bold text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {parts.map((part, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-blue-500 ${
            selectedIndex === index ? 'bg-blue-200 dark:bg-blue-800' : 'bg-gray-200 dark:bg-gray-800'
          }`}
          aria-label={`${title} ${index + 1}`}
        >
           <div className={`border-2 rounded-sm transition-colors ${selectedIndex === index ? 'border-blue-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
            <PixelArtDisplay part={part} size="sm" />
          </div>
        </button>
      ))}
    </div>
  </div>
);


export const PixelHouseGenerator: React.FC = () => {
  const [roofIndex, setRoofIndex] = useState(0);
  const [wallIndex, setWallIndex] = useState(0);
  const [foundationIndex, setFoundationIndex] = useState(0);
  const [yardIndex, setYardIndex] = useState(0);
  const [currentHouse, setCurrentHouse] = useState<HousePart>([]);
  const [savedHouses, setSavedHouses] = useState<House[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixel-houses');
      if (saved) {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData) && parsedData.every(item => 'roofIndex' in item)) {
            setSavedHouses(parsedData);
        } else {
            localStorage.removeItem('pixel-houses');
        }
      }
    } catch (error) {
      console.error("Failed to load saved houses:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pixel-houses', JSON.stringify(savedHouses));
    } catch (error) {
      console.error("Failed to save houses:", error);
    }
  }, [savedHouses]);

  const generateRandomHouse = useCallback(() => {
    setRoofIndex(getRandomIndex(ROOFS));
    setWallIndex(getRandomIndex(WALLS));
    setFoundationIndex(getRandomIndex(FOUNDATIONS));
    setYardIndex(getRandomIndex(YARDS));
  }, []);

  const buildHouse = useCallback((house: House) => {
    return combinePartsVertically([
        ROOFS[house.roofIndex],
        WALLS[house.wallIndex],
        FOUNDATIONS[house.foundationIndex],
        YARDS[house.yardIndex],
    ]);
  }, []);

  useEffect(() => {
    const combined = buildHouse({ roofIndex, wallIndex, foundationIndex, yardIndex });
    setCurrentHouse(combined);
  }, [roofIndex, wallIndex, foundationIndex, yardIndex, buildHouse]);

  useEffect(() => {
    generateRandomHouse();
  }, [generateRandomHouse]);

  const handleSaveHouse = () => {
    const newHouse: House = { roofIndex, wallIndex, foundationIndex, yardIndex };
    const isDuplicate = savedHouses.some(t => 
        t.roofIndex === newHouse.roofIndex &&
        t.wallIndex === newHouse.wallIndex &&
        t.foundationIndex === newHouse.foundationIndex &&
        t.yardIndex === newHouse.yardIndex
    );
    if (!isDuplicate) {
      setSavedHouses([...savedHouses, newHouse]);
    } else {
        alert("Nhà này đã được lưu rồi!");
    }
  };

  const handleDeleteHouse = (indexToDelete: number) => {
    setSavedHouses(savedHouses.filter((_, index) => index !== indexToDelete));
  };

  const handleLoadHouse = (house: House) => {
    setRoofIndex(house.roofIndex);
    setWallIndex(house.wallIndex);
    setFoundationIndex(house.foundationIndex);
    setYardIndex(house.yardIndex);
  };
  
  const getCanvasForHouse = (houseParts: HousePart, pixelSize: number): HTMLCanvasElement | null => {
    const canvasColorMap: { [key: string]: string } = {
        'g': '#22c55e', 'G': '#166534', 'h': '#14532d', 'H': '#4ade80', // greens
        'u': '#16a34a', 'U': '#15803d', // more greens
        'y': '#fde047', 'Y': '#eab308', '0': '#facc15', // yellows
        'b': '#a16207', 'B': '#854d0e', 'n': '#b45309', // browns
        'c': '#9ca3af', 'C': '#4b5563', // greys
        'w': '#ffffff', // white
        'z': '#facc15', 'Z': '#ec4899', // flowers
        '3': '#ef4444', '4': '#b91c1c', // reds
        '5': '#3b82f6', // blue
        '$': '#0f172a', // black
        'F': '#ef4444', // fruit red
    };

    const allRows = houseParts;
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
        ROOFS[roofIndex],
        WALLS[wallIndex],
        FOUNDATIONS[foundationIndex],
        YARDS[yardIndex],
    ]);
    const canvas = getCanvasForHouse(combinedParts, 20);
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pixel-house.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  const handleDownloadAll = () => {
    if (savedHouses.length === 0) return;

    const PIXEL_SIZE_SMALL = 4;
    const PADDING = 20;
    const HOUSES_PER_ROW = 10;

    const housesData = savedHouses.map(house => {
        const combinedParts = combinePartsVertically([
            ROOFS[house.roofIndex], 
            WALLS[house.wallIndex], 
            FOUNDATIONS[house.foundationIndex], 
            YARDS[house.yardIndex],
        ]);
        return getCanvasForHouse(combinedParts, PIXEL_SIZE_SMALL);
    }).filter((c): c is HTMLCanvasElement => c !== null);

    if (housesData.length === 0) return;
    
    const maxHouseWidth = Math.max(0, ...housesData.map(c => c.width));
    const maxHouseHeight = Math.max(0, ...housesData.map(c => c.height));

    const cellWidth = maxHouseWidth + PADDING;
    const cellHeight = maxHouseHeight + PADDING;

    const numRows = Math.ceil(savedHouses.length / HOUSES_PER_ROW);
    const numCols = Math.min(savedHouses.length, HOUSES_PER_ROW);

    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = numCols * cellWidth - PADDING;
    mainCanvas.height = numRows * cellHeight - PADDING;
    const ctx = mainCanvas.getContext('2d');
    if (!ctx) return;

    housesData.forEach((houseCanvas, index) => {
        const gridX = index % HOUSES_PER_ROW;
        const gridY = Math.floor(index / HOUSES_PER_ROW);
        const canvasX = gridX * cellWidth;
        const canvasY = gridY * cellHeight;
        const xOffset = (maxHouseWidth - houseCanvas.width) / 2;
        const yOffset = (maxHouseHeight - houseCanvas.height) / 2;
        ctx.drawImage(houseCanvas, canvasX + xOffset, canvasY + yOffset);
    });

    const link = document.createElement('a');
    link.download = 'pixel-houses_collection.png';
    link.href = mainCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <section className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-8 min-h-[300px] flex items-center justify-center">
        <PixelArtDisplay part={currentHouse} />
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        <button onClick={generateRandomHouse} className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tạo Ngẫu Nhiên</button>
        <button onClick={handleSaveHouse} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Lưu Nhà</button>
        <button onClick={handleDownloadSingle} className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tải PNG</button>
      </section>

      <div>
        <PartSelector title="Mái Nhà" parts={ROOFS} selectedIndex={roofIndex} onSelect={setRoofIndex} />
        <PartSelector title="Tường" parts={WALLS} selectedIndex={wallIndex} onSelect={setWallIndex} />
        <PartSelector title="Nền Móng" parts={FOUNDATIONS} selectedIndex={foundationIndex} onSelect={setFoundationIndex} />
        <PartSelector title="Sân Vườn" parts={YARDS} selectedIndex={yardIndex} onSelect={setYardIndex} />
      </div>

      {savedHouses.length > 0 && (
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Nhà Đã Lưu</h2>
            <button
              onClick={handleDownloadAll}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-sm"
            >
              Tải Tất Cả
            </button>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {savedHouses.map((house, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadHouse(house)}>
                <div className="bg-gray-300 dark:bg-gray-700 rounded-md p-1">
                    <PixelArtDisplay part={buildHouse(house)} size="sm" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteHouse(index);
                  }}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold leading-none pb-1"
                  aria-label="Xóa nhà"
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