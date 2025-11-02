type PyramidPart = string[];

// y, Y, 0: Stone/Gold colors
// a, A: Sand colors
// s, N: Sky colors
// o, O: Water colors
// g, G: Plant colors
// b, B: Wood/Trunk colors
// w: White/Shine
// c, C: Grey/Rock colors
// $: Black/Outline

export const TOPS: PyramidPart[] = [
  // 1. Classic Pointy
  [
    '   y   ',
    '  yYy  ',
    ' yY0Yy ',
    'yY0w0Yy',
  ],
  // 2. Golden Capstone
  [
    '   0   ',
    '  0Y0  ',
    ' 0YwY0 ',
    '0Y0Y0Y0',
  ],
  // 3. Flat Top
  [
    'yY000Yy',
    'yY000Yy',
  ],
  // 4. Crystal Top
  [
    '   w   ',
    '  wsw  ',
    ' wswsw ',
    'wswswsw',
  ],
  // 5. Damaged Top
  [
    '   y   ',
    '  y y  ',
    ' y 0 Yy',
    'yY0 0Y ',
  ],
  // 6. Eye of Horus
  [
    '   y   ',
    '  yYy  ',
    ' yY0Yy ',
    'yY$w$Yy',
  ],
  // 7. Simple Small
  [
    '  y  ',
    ' yYy ',
    'yY0Yy',
  ],
  // 8. Ornate Spire
  [
    '   0   ',
    '   Y   ',
    '  yYy  ',
    ' yY0Yy ',
  ],
  // 9. Dual Spire
  [
    ' y   y ',
    'yYy yYy',
    ' Y0Y0Y ',
  ],
  // 10. Round Top
  [
    '  yyy  ',
    ' yY0Yy ',
    'yY0w0Yy',
  ],
];

export const MIDDLES: PyramidPart[] = [
  // 1. Standard Layers
  [
    ' yY0Y0Yy ',
    'yY0Y0Y0Yy',
    ' yY0Y0Yy ',
    'yY0Y0Y0Yy',
  ],
  // 2. Entrance
  [
    ' yY0Y0Yy ',
    'yY0$$$0Yy',
    'yY0$x$0Yy',
    'yY0Y0Y0Yy',
  ],
  // 3. Hieroglyphs
  [
    ' yY0s0Yy ',
    'yYgY0Y$Yy',
    ' yY0b0Yy ',
    'yY$YgY0Yy',
  ],
  // 4. Smooth Sides
  [
    ' yYYYYYy ',
    'yYYYYYYYYy',
    ' yYYYYYy ',
    'yYYYYYYYYy',
  ],
  // 5. Damaged Section
  [
    ' yY0 0Yy ',
    'yY0Y Y0Yy',
    ' yY 0Y0y ',
    'yY0Y0 0Yy',
  ],
  // 6. Two Entrances
  [
    ' yY0Y0Yy ',
    'yY$x$Y$x$Yy',
    'yY0Y0Y0Yy',
  ],
  // 7. Large Layers
  [
    '  yY000Yy  ',
    ' yY00000Yy ',
    'yY0000000Yy',
  ],
  // 8. Windows
  [
    ' yY0x0Yy ',
    'yY0Y0Y0Yy',
    ' yY0x0Yy ',
    'yY0Y0Y0Yy',
  ],
  // 9. Striped
  [
    ' yYyYyYy ',
    'yY0Y0Y0Yy',
    ' yYyYyYy ',
    'yY0Y0Y0Yy',
  ],
  // 10. Overgrown
  [
    ' gY0YgYy ',
    'yYgY0Y0Yy',
    ' gy0Y0gy ',
    'yY0YgY0Yy',
  ],
];

export const BASES: PyramidPart[] = [
  // 1. Wide Base
  [
    '  yY0Y0Y0Yy  ',
    ' yY0Y0Y0Y0Yy ',
    'yY0Y0Y0Y0Y0Yy',
  ],
  // 2. Step Pyramid Base
  [
    '   yY000Yy   ',
    '  yY00000Yy  ',
    ' yY0000000Yy ',
    'yY000000000Yy',
  ],
  // 3. Base with Entrance
  [
    ' yY0Y0Y0Y0Yy ',
    'yY0Y $$$ Y0Yy',
    'yY0Y $x$ Y0Yy',
  ],
  // 4. Tall Base
  [
    'yY0Y0Y0Y0Y0Yy',
    'yY0Y0Y0Y0Y0Yy',
    'yY0Y0Y0Y0Y0Yy',
  ],
  // 5. Foundation Platform
  [
    ' cCCCCCCCCc ',
    'cYYYYYYYYYYc',
    'yY0Y0Y0Y0Y0Yy',
  ],
  // 6. Ornate Base
  [
    ' yY0sYgYbY0Yy ',
    'yY$Y0Y$Y0Y$Y0Yy',
  ],
  // 7. Small Base
  [
    ' yY0Y0Y0Y0Yy ',
    'yY0Y0Y0Y0Y0Yy',
  ],
  // 8. Ruined Base
  [
    '  yY Y0Y0Yy  ',
    ' yY0Y0 0Y0Yy ',
    'yY0 0Y0Y 0Y y',
  ],
  // 9. Sand-covered
  [
    '   aY0Y0Yy   ',
    '  aAY0Y0Y0Aa ',
    ' aAAY0Y0YAAAAa',
  ],
  // 10. Double Step Base
  [
    '   yY0Y0Yy   ',
    '  AAAAAAAAA  ',
    ' yY0Y0Y0Y0Yy ',
    'AAAAAAAAAAAAA',
  ],
];

export const SCENERIES: PyramidPart[] = [
  // 1. Desert Dunes
  [
    'sNsNsNsNsNsNsNsN',
    'sNsNsNsNsNsNsNsN',
    'aAaAaAAaAaAAaAaa',
    'AaaaaAAaaaaAAAaa',
  ],
  // 2. Oasis
  [
    '   b     b    sN',
    '  gg   ggoOoosN',
    'aAaggoOooOoaAaA',
    'AaaoOooOooooaAA',
  ],
  // 3. Nile River
  [
    'oOoOoOoOoOoOoOoO',
    'oOoOoOoOoOoOoOoO',
    'gGgGgGgGgGgGgGgG',
    'aAaAaAaAaAaAaAaA',
  ],
  // 4. Night Sky
  [
    'x x wxx y xy x w',
    'x wxx yxy wxx yx',
    'AaaaaAAaaaaAAAaa',
    'AaaaaAAaaaaAAAaa',
  ],
  // 5. Sunny Day
  [
    '0Y0 sNsNsNsNsNsN',
    'YwY0sNsNsNsNsNsN',
    '0Y0 sNsNsNsNsNsN',
    'aAaaAAaAaaAAaaaa',
  ],
  // 6. Rocky Terrain
  [
    'sNsNsNsNsNsNsNsN',
    'sNcNsNscNsNscNsN',
    'ACcACcACCAcCAcCA',
    'CAcaCAcaCAcaCAca',
  ],
  // 7. Sandstorm
  [
    'aAaAaAaAaAaAaAaA',
    'AaAaAaAaAaAaAaAa',
    'aAaAaAaAaAaAaAaA',
    'AaAaAaAaAaAaAaAa',
  ],
  // 8. Sunset
  [
    '8989898989898989',
    '3434343434343434',
    'AxxAAxxAAAxxAAxa',
    'AxxxxAAxxxxAAAxa',
  ],
  // 9. Flat Ground
  [
    'sNsNsNsNsNsNsNsN',
    'sNsNsNsNsNsNsNsN',
    'AAAAAAAAAAAAAAAA',
    'AAAAAAAAAAAAAAAA',
  ],
  // 10. Village nearby
  [
    'sN b sNsNsN b sN',
    'sNggg sNsN gggsN',
    'aAwwAaAaAawwAaA',
    'AaaaaAAaaaaAAAaa',
  ],
];