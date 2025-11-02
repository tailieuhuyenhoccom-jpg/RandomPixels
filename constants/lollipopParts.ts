type LollipopPart = string[];

// CANDIES: Main shape and base color
// f: pink, Z: dark pink
// 3: red, 4: dark red
// 5: blue, 6: dark blue
// 0: yellow, Y: dark yellow
// g: green, G: dark green
// v: violet, V: dark violet
// a: amber, A: dark amber
// 8: orange, 9: dark orange
// w: white
export const CANDIES: LollipopPart[] = [
  // 1. Pink Round
  [
    '    ffff    ',
    '  ffffffff  ',
    ' ffffffffff ',
    'ffffffffffff',
    'ffffffffffff',
    'ffffffffffff',
    ' ffffffffff ',
    '  ffffffff  ',
    '    ffff    '
  ],
  // 2. Red Heart
  [
    '  33    33  ',
    ' 3333  3333 ',
    '333333333333',
    '333333333333',
    '333333333333',
    ' 3333333333 ',
    '  33333333  ',
    '   333333   ',
    '    3333    '
  ],
  // 3. Blue Swirl
  [
    '    5555    ',
    '  56666665  ',
    ' 566w55w665 ',
    '56w5555w665',
    '56w5555w665',
    '566w55w6665',
    ' 56655w665 ',
    '  56666665  ',
    '    5555    '
  ],
  // 4. Yellow Star
  [
    '      00      ',
    '     0YY0     ',
    ' 0000YwYY0000 ',
    '  00YYYYYY00  ',
    '   00YYYY00   ',
    '  00Y YY Y00  ',
    ' 0Y0  00  0Y0 ',
    '0Y          Y0',
  ],
  // 5. Green Square
  [
    ' gggggggggg ',
    'gggggggggggg',
    'ggGgGgGgGgGg',
    'gGgGgGgGgGgG',
    'ggGgwgGgGgGg',
    'gGgGgGgGgGgG',
    'ggGgGgGgGgGg',
    'gGgGgGgGgGgG',
    'gggggggggggg',
    ' gggggggggg ',
  ],
  // 6. Rainbow Swirl
  [
    '    33g5    ',
    '  3g5503g5  ',
    ' 3g503g503g ',
    '3g503g503g50',
    'g503g503g503',
    '503g503g503g',
    ' 03g503g503 ',
    '  g503g503  ',
    '    503g    '
  ],
   // 7. Violet Flower
  [
    '    vVv     ',
    '  vVvVvVv   ',
    ' vVv0Y0vVv  ',
    'vVv0YYY0vVv ',
    'vVv0YwY0vVv ',
    ' vVv0YY0vVv  ',
    '  vVvVvVv   ',
    '    vVv     ',
    '     v      '
  ],
  // 8. Orange Slice
  [
    '   888888   ',
    '  89w9w9w98  ',
    ' 89w9w9w9w98 ',
    '89w9w9w9w9w98',
    '89w9w9w9w9w98',
    '8999999999998',
    ' 89999999998 ',
    '  888888888  ',
    '   888888   '
  ],
  // 9. Pink Layered Square
  [
    ' ffffffff ',
    ' fZZZZZZf ',
    ' fZwwwwZf ',
    ' fZwZZwZf ',
    ' fZwZZwZf ',
    ' fZwwwwZf ',
    ' fZZZZZZf ',
    ' ffffffff ',
  ],
  // 10. Amber Gummy Bear
  [
    '   aAaaAa   ',
    '  aAAAAAAa  ',
    ' aAawwwaAAa ',
    ' aAAwwwAAa ',
    ' aAAAAAAAAa ',
    '  aAAAAAAa  ',
    '   aAAAAa   ',
    '  aA    Aa  ',
    ' aA      Aa '
  ],
];

// PATTERNS: Overlays on top of the candy
export const PATTERNS: LollipopPart[] = [
  // 1. No Pattern
  [' '],
  // 2. Double Stripe (Dark Pink)
  [
    '            ',
    '            ',
    ' fZZZZZZZZZf ',
    'fZZZZZZZZZZZf',
    '            ',
    ' fZZZZZZZZZf ',
    'fZZZZZZZZZZZf',
  ],
  // 3. Swirl (White)
  [
    '     ww     ',
    '   ww  ww   ',
    '  ww    ww  ',
    ' ww      ww ',
    '  ww    ww  ',
    '   ww  ww   ',
    '     ww     ',
  ],
  // 4. Sprinkles
  [
    '   3  5     ',
    '  0 g  3 5  ',
    ' g  3  0    ',
    '5 0 g 3 5 g ',
    ' 3   5 g 0  ',
    '  g 0 3 5   ',
    ' 5   g   3  ',
  ],
  // 5. Single Stripe (Dark Red)
  [
    '            ',
    '            ',
    '            ',
    ' 3444444443 ',
    '344444444443',
    ' 3444444443 ',
  ],
  // 6. Heart (White)
  [
   '            ',
   '            ',
   '    ww ww   ',
   '   wwwwww   ',
   '   wwwwww   ',
   '    wwww    ',
   '     ww     ',
   '            ',
  ],
  // 7. Checkered (Dark Pink)
  [
   '  ZZ  ZZ  ZZ  ',
   ' ZZ  ZZ  ZZ   ',
   '  ZZ  ZZ  ZZ  ',
   ' ZZ  ZZ  ZZ   ',
   '  ZZ  ZZ  ZZ  ',
   ' ZZ  ZZ  ZZ   ',
   '  ZZ  ZZ  ZZ  ',
  ],
  // 8. Star (White)
  [
   '      ww      ',
   '     wwww     ',
   ' wwww wwww ',
   '  wwwwwwww  ',
   '   wwwwww   ',
   '  ww ww ww  ',
   ' ww      ww ',
  ],
  // 9. Polka Dots (White)
  [
   '  w   w   w  ',
   '    w   w    ',
   ' w   w   w   ',
   '   w   w   w ',
   ' w   w   w   ',
   '    w   w    ',
   '  w   w   w  ',
  ],
  // 10. Diagonal Stripes (White)
  [
    '      w    ',
    '     w w   ',
    '    w w w  ',
    '   w w w w ',
    '  w w w w  ',
    ' w w w w   ',
    'w w w w    ',
    ' w w w     ',
    '  w w      ',
  ],
];

// SHINES: Glossy highlights
export const SHINES: LollipopPart[] = [
    // 1. No Shine
    [' '],
    // 2. Top Left
    [
      '   ww      ',
      '  w        ',
    ],
    // 3. Top Right
    [
      '      ww   ',
      '        w  ',
    ],
    // 4. Center
    [
      '     w      ',
      '    w w     ',
      '     w      ',
    ],
    // 5. Long Shine
    [
      '    w       ',
      '   w        ',
      '  w         ',
      ' w          ',
    ],
    // 6. Bottom Left
    [
      '            ',
      '            ',
      '            ',
      '            ',
      '  w         ',
      ' w w        ',
    ],
    // 7. Bottom Right
    [
      '            ',
      '            ',
      '            ',
      '            ',
      '         w  ',
      '        w w ',
    ],
    // 8. Horizontal Bar
    [
      '            ',
      '   wwwwww   ',
      '  wwwwwwww  ',
    ],
    // 9. Small Sparkle
    [
      '      w      ',
      '     w w     ',
      '      w      ',
      '             ',
      '   w         ',
      '  w w        ',
      '   w         ',
    ],
    // 10. Vertical Bar
    [
      '      w     ',
      '      w     ',
      '     ww     ',
      '     ww     ',
      '     ww     ',
      '      w     ',
      '      w     ',
    ],
];

// STICKS
// c: grey, C: dark grey
// b: brown, B: dark brown, n: light brown
// f: pink, Z: dark pink
export const STICKS: LollipopPart[] = [
  // 1. Simple
  [
    '  cc  ',
    '  cC  ',
    '  cC  ',
    '  cC  ',
    '  cC  ',
    '  cC  ',
    '  cC  ',
  ],
  // 2. Short
  [
    '  cc  ',
    '  cC  ',
    '  cC  ',
    '  cC  ',
  ],
  // 3. Striped
  [
    '  cwc  ',
    '  cCc  ',
    '  cwc  ',
    '  cCc  ',
    '  cwc  ',
    '  cCc  ',
    '  cwc  ',
  ],
  // 4. Thick
  [
    '  cccc  ',
    '  cCCc  ',
    '  cCCc  ',
    '  cCCc  ',
    '  cCCc  ',
    '  cCCc  ',
  ],
  // 5. Curvy
  [
    '   cc ',
    '  cC  ',
    '  cC  ',
    ' cC   ',
    ' cC   ',
    '  cC  ',
    '  cc  ',
  ],
  // 6. Pretzel
  [
   '  nbBn  ',
   ' nB  Bn ',
   '  n  B  ',
   ' nB  Bn ',
   '  nbBn  ',
   '   bB   ',
   '   bB   ',
   '   bB   ',
  ],
  // 7. Ribbon Wrapped
  [
   '  fccZ  ',
   '  fcCz  ',
   '  fccZ  ',
   '  fcCz  ',
   '  fccZ  ',
   '  fcCz  ',
   '  fccZ  ',
  ],
  // 8. Crooked
  [
   '    cc  ',
   '   cC   ',
   '   cC   ',
   '  cC    ',
   ' cC     ',
   ' cC     ',
   ' cc     ',
  ],
  // 9. Stubby with Base
  [
   '   cc   ',
   '   cC   ',
   '   cC   ',
   ' ccccc  ',
   ' cCCCCc ',
  ],
  // 10. Ornate
  [
    '  cCCCc  ',
    ' cC c Cc ',
    '   cc   ',
    '   cC   ',
    '   cC   ',
    '   cC   ',
    '   cC   ',
  ],
];