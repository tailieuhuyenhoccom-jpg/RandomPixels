type FlowerPart = string[];

// STEMS & LEAVES
// g, G, h, H: Green tones
// l, L: Lighter green
// c: grey for thorns

// PETALS & CENTERS
// f, F, Z, k, K: Pinks/Reds
// 3, 4: Reds
// v, V, p, P: Violets/Purples
// 5, 6, s, N, o, O: Blues
// y, Y, 0, !, a: Yellows/Oranges
// w: White

export const PETALS: FlowerPart[] = [
  // 1. Red Rose
  [
    '    3333    ',
    '  34333343  ',
    ' 3433F33F43 ',
    '343FF3F3F343',
    '343F3F3F3F43',
    ' 343F3F3F43 ',
    '  34333343  ',
    '    3443    ',
  ],
  // 2. Yellow Sunflower
  [
    '  yYy  yYy  ',
    ' yY0YyY0Yy ',
    'yY0w0Y0w0Yy',
    ' Y0Y0Y0Y0Y ',
    'yY0w0Y0w0Yy',
    ' yY0YyY0Yy ',
    '  yYy  yYy  ',
  ],
  // 3. Blue Tulip
  [
    '    5555    ',
    '   56ww65   ',
    '  56w  w65  ',
    ' 56w    w65 ',
    ' 56w    w65 ',
    ' 565    565 ',
    '  565  565  ',
    '   566665   ',
  ],
  // 4. White Daisy
  [
    '   ww  ww   ',
    ' ww  ww  ww ',
    'ww        ww',
    'ww        ww',
    'ww        ww',
    ' ww  ww  ww ',
    '   ww  ww   ',
  ],
  // 5. Purple Pansy
  [
    '  pp    pp  ',
    ' pPPp  pPPp ',
    'pPPPp  pPPPp',
    ' VVVp  pVVV ',
    '  VVp  pVV  ',
    '   Vp  pV   ',
    '    V  V    ',
    '     VV     ',
  ],
  // 6. Pink Lotus
  [
    '      f      ',
    '     fFf     ',
    '    fFwFf    ',
    '   fFwFwFf   ',
    ' fFwFfFfFwFf ',
    '  fFf   fFf  ',
    '   f     f   ',
  ],
  // 7. Orange Marigold
  [
    '   8989898   ',
    '  898898898  ',
    ' 89889988989 ',
    '8989898989898',
    ' 89889988989 ',
    '  898898898  ',
    '   8989898   ',
  ],
  // 8. Violet Aster
  [
    ' v V v V v V ',
    'V v V v V v V',
    ' v V v V v V ',
    'V v V v V v V',
    ' v V v V v V ',
    'V v V v V v V',
    ' v V v V v V ',
  ],
  // 9. Simple Red Flower
  [
    '   33  33   ',
    ' 3333333333 ',
    '  33333333  ',
    '333333333333',
    '  33333333  ',
    ' 3333333333 ',
    '   33  33   ',
  ],
  // 10. Bellflower
  [
    '    pPp    ',
    '   pP P p   ',
    '  pP   P p  ',
    ' pP     P p ',
    'pP       P p',
    ' pP     P p ',
    '  pP   P p  ',
    '   pPPPPp   ',
  ],
];

export const CENTERS: FlowerPart[] = [
  // 1. Simple Yellow
  [
    ' yYy ',
    'yY0Yy',
    ' yYy ',
  ],
  // 2. Brown & Textured
  [
    ' bBb ',
    'bBnNb',
    ' bBb ',
  ],
  // 3. White & Fluffy
  [
    ' www ',
    'wwcww',
    ' www ',
  ],
  // 4. Large Yellow
  [
    '   yYy   ',
    '  yY0Yy  ',
    ' yY0w0Yy ',
    '  yY0Yy  ',
    '   yYy   ',
  ],
  // 5. Dark Center
  [
    ' BBB ',
    'BnbnB',
    ' BBB ',
  ],
  // 6. No Center
  [' '],
  // 7. Pinkish
  [
    ' fZf ',
    'fZwZf',
    ' fZf ',
  ],
  // 8. Star Shaped
  [
    '  y  ',
    'yYyYy',
    ' YwY ',
    'yYyYy',
    '  y  ',
  ],
  // 9. Tiny Yellow
  ['0'],
  // 10. Gradient
  [
    ' yyy ',
    'y000y',
    'y0w0y',
    'y000y',
    ' yyy ',
  ],
];

export const LEAVES: FlowerPart[] = [
  // 1. Two Simple Leaves
  [
    '  g    g  ',
    ' gGg  gGg ',
    '  g    g  ',
  ],
  // 2. One Side Leaf
  [
    '    gGg ',
    '   gHhG ',
    '    gGg ',
  ],
  // 3. Spiky Leaves
  [
    'g g g  g g g',
    ' GgG    GgG ',
  ],
  // 4. Large Lower Leaves
  [
    '          ',
    '          ',
    'gHhg    ghHg',
    'GhhhG  GhhhG',
  ],
  // 5. No Leaves
  [' '],
  // 6. Vine-like
  [
    ' g      g ',
    ' Gg    gG ',
    '  g    g  ',
    ' gG    Gg ',
    'g      g  ',
  ],
  // 7. Fern-like
  [
    '  h h h h  ',
    ' gHgHgHgHg ',
    'GgGgGgGgGgG',
  ],
  // 8. Round Leaves
  [
    '  gg      gg  ',
    ' gGGg    gGGg ',
    '  gg      gg  ',
  ],
  // 9. Upward Leaves
  [
    ' gGg  gGg ',
    'gHhG  Ghhg',
    ' hHh    hHh ',
  ],
  // 10. Droopy Leaves
  [
    '          ',
    'gGg    gGg',
    ' gHg  gHg ',
    '  g    g  ',
  ],
];

export const STEMS: FlowerPart[] = [
  // 1. Simple Straight
  [
    ' g ',
    ' g ',
    ' G ',
    ' G ',
    ' g ',
    ' g ',
    ' G ',
  ],
  // 2. Short & Thick
  [
    ' gG ',
    ' gG ',
    ' gG ',
    ' gG ',
  ],
  // 3. Tall & Thin
  [
    ' g ',
    ' G ',
    ' g ',
    ' G ',
    ' g ',
    ' G ',
    ' g ',
    ' G ',
    ' g ',
  ],
  // 4. Curved
  [
    '  g',
    '  G',
    ' g ',
    ' G ',
    'g  ',
    'G  ',
  ],
  // 5. Thorny
  [
    ' g c',
    ' G  ',
    'cg ',
    ' G  ',
    ' g c',
    ' G  ',
  ],
  // 6. Budding Stem
  [
    'gGg',
    ' g ',
    ' g ',
    ' G ',
    'gGg',
    ' G ',
    ' g ',
  ],
  // 7. Simple Short
  [
    ' g ',
    ' G ',
    ' g ',
  ],
  // 8. Bent Stem
  [
    ' g ',
    ' G ',
    ' gGg',
    '  G ',
    '  g ',
  ],
  // 9. Rooted
  [
    ' g ',
    ' G ',
    ' g ',
    'bBb',
    ' n ',
  ],
  // 10. Very Thick
  [
    ' gGg ',
    ' gGg ',
    ' gGg ',
    ' gGg ',
    ' gGg ',
  ],
];
