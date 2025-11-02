import React, { useState, useEffect, useCallback } from 'react';
import { CANOPIES, TRUNKS, ROOTS, GROUND_COVERS } from '../constants/treeParts';
import { PixelArtDisplay } from './PixelArtDisplay';

type TreePart = string[];

interface Tree {
  canopyIndex: number;
  trunkIndex: number;
  rootIndex: number;
  groundCoverIndex: number;
}

const getRandomIndex = <T,>(arr: T[]): number => {
  return Math.floor(Math.random() * arr.length);
};

const combinePartsVertically = (parts: TreePart[]): TreePart => {
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

const PartSelector = ({ title, parts, selectedIndex, onSelect }: { title: string, parts: TreePart[], selectedIndex: number, onSelect: (index: number) => void }) => (
  <div className="mb-8">
    <h3 className="text-xl mb-3 font-bold text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
      {parts.map((part, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`p-1 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-green-500 ${
            selectedIndex === index ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-800'
          }`}
          aria-label={`${title} ${index + 1}`}
        >
           <div className={`border-2 rounded-sm transition-colors ${selectedIndex === index ? 'border-green-500' : 'border-transparent hover:border-gray-400 dark:hover:border-gray-600'}`}>
            <PixelArtDisplay part={part} size="sm" />
          </div>
        </button>
      ))}
    </div>
  </div>
);


export const PixelTreeGenerator: React.FC = () => {
  const [canopyIndex, setCanopyIndex] = useState(0);
  const [trunkIndex, setTrunkIndex] = useState(0);
  const [rootIndex, setRootIndex] = useState(0);
  const [groundCoverIndex, setGroundCoverIndex] = useState(0);
  const [currentTree, setCurrentTree] = useState<TreePart>([]);
  const [savedTrees, setSavedTrees] = useState<Tree[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixel-trees');
      if (saved) {
        const parsedData = JSON.parse(saved);
        if (Array.isArray(parsedData) && parsedData.every(item => 'canopyIndex' in item)) {
            setSavedTrees(parsedData);
        } else {
            localStorage.removeItem('pixel-trees');
        }
      }
    } catch (error) {
      console.error("Failed to load saved trees:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pixel-trees', JSON.stringify(savedTrees));
    } catch (error) {
      console.error("Failed to save trees:", error);
    }
  }, [savedTrees]);

  const generateRandomTree = useCallback(() => {
    setCanopyIndex(getRandomIndex(CANOPIES));
    setTrunkIndex(getRandomIndex(TRUNKS));
    setRootIndex(getRandomIndex(ROOTS));
    setGroundCoverIndex(getRandomIndex(GROUND_COVERS));
  }, []);

  const buildTree = useCallback((tree: Tree) => {
    return combinePartsVertically([
        CANOPIES[tree.canopyIndex],
        TRUNKS[tree.trunkIndex],
        ROOTS[tree.rootIndex],
        GROUND_COVERS[tree.groundCoverIndex],
    ]);
  }, []);

  useEffect(() => {
    const combined = buildTree({ canopyIndex, trunkIndex, rootIndex, groundCoverIndex });
    setCurrentTree(combined);
  }, [canopyIndex, trunkIndex, rootIndex, groundCoverIndex, buildTree]);

  useEffect(() => {
    generateRandomTree();
  }, [generateRandomTree]);

  const handleSaveTree = () => {
    const newTree: Tree = { canopyIndex, trunkIndex, rootIndex, groundCoverIndex };
    const isDuplicate = savedTrees.some(t => 
        t.canopyIndex === newTree.canopyIndex &&
        t.trunkIndex === newTree.trunkIndex &&
        t.rootIndex === newTree.rootIndex &&
        t.groundCoverIndex === newTree.groundCoverIndex
    );
    if (!isDuplicate) {
      setSavedTrees([...savedTrees, newTree]);
    } else {
        alert("Cây này đã được lưu rồi!");
    }
  };

  const handleDeleteTree = (indexToDelete: number) => {
    setSavedTrees(savedTrees.filter((_, index) => index !== indexToDelete));
  };

  const handleLoadTree = (tree: Tree) => {
    setCanopyIndex(tree.canopyIndex);
    setTrunkIndex(tree.trunkIndex);
    setRootIndex(tree.rootIndex);
    setGroundCoverIndex(tree.groundCoverIndex);
  };
  
  const getCanvasForTree = (treeParts: TreePart, pixelSize: number): HTMLCanvasElement | null => {
    const canvasColorMap: { [key: string]: string } = {
        'g': '#22c55e', 'G': '#166534', 'h': '#14532d', 'H': '#4ade80', 'l': '#a3e635', 'L': '#65a30d', 'f': '#f472b6', 'F': '#ef4444', 'y': '#fde047',
        'b': '#a16207', 'B': '#854d0e', 'n': '#b45309', 'X': '#facc15',
        'r': '#7c2d12', 'R': '#44403c',
        'u': '#16a34a', 'U': '#15803d', 'm': '#ef4444', 'M': '#b91c1c', 'w': '#ffffff', 'z': '#facc15', 'Z': '#ec4899', 'c': '#9ca3af', 'C': '#4b5563',
    };

    const allRows = treeParts;
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
        CANOPIES[canopyIndex],
        TRUNKS[trunkIndex],
        ROOTS[rootIndex],
        GROUND_COVERS[groundCoverIndex],
    ]);
    const canvas = getCanvasForTree(combinedParts, 20);
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pixel-tree.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  const handleDownloadAll = () => {
    if (savedTrees.length === 0) return;

    const PIXEL_SIZE_SMALL = 4;
    const PADDING = 20;
    const TREES_PER_ROW = 10;

    const treesData = savedTrees.map(tree => {
        const combinedParts = combinePartsVertically([
            CANOPIES[tree.canopyIndex], 
            TRUNKS[tree.trunkIndex], 
            ROOTS[tree.rootIndex], 
            GROUND_COVERS[tree.groundCoverIndex],
        ]);
        return getCanvasForTree(combinedParts, PIXEL_SIZE_SMALL);
    }).filter((c): c is HTMLCanvasElement => c !== null);

    if (treesData.length === 0) return;
    
    const maxTreeWidth = Math.max(0, ...treesData.map(c => c.width));
    const maxTreeHeight = Math.max(0, ...treesData.map(c => c.height));

    const cellWidth = maxTreeWidth + PADDING;
    const cellHeight = maxTreeHeight + PADDING;

    const numRows = Math.ceil(savedTrees.length / TREES_PER_ROW);
    const numCols = Math.min(savedTrees.length, TREES_PER_ROW);

    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = numCols * cellWidth - PADDING;
    mainCanvas.height = numRows * cellHeight - PADDING;
    const ctx = mainCanvas.getContext('2d');
    if (!ctx) return;

    treesData.forEach((treeCanvas, index) => {
        const gridX = index % TREES_PER_ROW;
        const gridY = Math.floor(index / TREES_PER_ROW);
        const canvasX = gridX * cellWidth;
        const canvasY = gridY * cellHeight;
        const xOffset = (maxTreeWidth - treeCanvas.width) / 2;
        const yOffset = (maxTreeHeight - treeCanvas.height) / 2;
        ctx.drawImage(treeCanvas, canvasX + xOffset, canvasY + yOffset);
    });

    const link = document.createElement('a');
    link.download = 'pixel-trees_collection.png';
    link.href = mainCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <section className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-8 min-h-[300px] flex items-center justify-center">
        <PixelArtDisplay part={currentTree} />
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        <button onClick={generateRandomTree} className="col-span-2 sm:col-span-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tạo Ngẫu Nhiên</button>
        <button onClick={handleSaveTree} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Lưu Cây</button>
        <button onClick={handleDownloadSingle} className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg transition-colors w-full font-semibold text-sm">Tải PNG</button>
      </section>

      <div>
        <PartSelector title="Tán Lá" parts={CANOPIES} selectedIndex={canopyIndex} onSelect={setCanopyIndex} />
        <PartSelector title="Thân Cây" parts={TRUNKS} selectedIndex={trunkIndex} onSelect={setTrunkIndex} />
        <PartSelector title="Rễ Cây" parts={ROOTS} selectedIndex={rootIndex} onSelect={setRootIndex} />
        <PartSelector title="Lớp Phủ" parts={GROUND_COVERS} selectedIndex={groundCoverIndex} onSelect={setGroundCoverIndex} />
      </div>

      {savedTrees.length > 0 && (
        <section className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Cây Đã Lưu</h2>
            <button
              onClick={handleDownloadAll}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-sm"
            >
              Tải Tất Cả
            </button>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {savedTrees.map((tree, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => handleLoadTree(tree)}>
                <div className="bg-gray-300 dark:bg-gray-700 rounded-md p-1">
                    <PixelArtDisplay part={buildTree(tree)} size="sm" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTree(index);
                  }}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xl font-bold leading-none pb-1"
                  aria-label="Xóa cây"
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