type PetPart = string[];

// t, T: teal
// v, V: violet
// k, K: pink
// a, A: amber (accent)
// w: white (highlight)
// FIX: Changed 'S' to 'N' to resolve key conflict.
// s, N: sky blue (secondary accent)
// x: black/dark grey (eyes/mouth)

export const PET_BODIES: PetPart[] = [
  // 1. Floof Ball (Violet)
  [
    '    vvvv    ',
    '  vvVvVvVv  ',
    ' vVvVvVvVvVv ',
    'vVvVwVvVvVvVv',
    'vVvVvVvVvVvVv',
    'vVvVvVvVvVvVv',
    ' vVvVvVvVvVv ',
    '  vVvVvVvVv  ',
    '   vvvvvv   ',
  ],
  // 2. Sitting Cat (Teal)
  [
    '    tttt    ',
    '   tTTTTt   ',
    '  tTTwTTTt  ',
    ' tTTTTTTTTt ',
    'tTTTTTTTTTTt',
    'tTTTTTTTTTTt',
    ' tTTTTTTTTt ',
    '  tTTTTTTt  ',
    ' tt t  t tt ',
    'tttt tttt ',
  ],
  // 3. Bouncing Slime (Pink)
  [
    '    kkkk    ',
    '   kKKKKk   ',
    '  kKKwKKKk  ',
    ' kKKKKKKKKk ',
    ' kKKKKKKKKk ',
    'kKKKKKKKKKKk',
    'kKKKKKKKKKKk',
    ' kKKKKKKKKk ',
    '  kKKKKKKk  ',
    '   kkkkkk   ',
  ],
  // 4. Chubby Bird (Amber)
  [
    '     aa     ',
    '    aAAa    ',
    '   aAAwAa   ',
    '  aAAAAAAa  ',
    ' aAAAAAAAAa ',
    'aAAAAAAAAAAa',
    'aAAAAAAAAAAa',
    ' aAAAAAAAAa ',
    '  aaaaaaaa  ',
    '   aa  aa   ',
  ],
  // 5. Standing Bear (Teal)
  [
    '   tttt   ',
    '  tTTTTt  ',
    ' tTTwTTTt ',
    'tTTTTTTTTt',
    'tTTTTTTTTt',
    ' tTTTTTTt ',
    ' tTTTTTTt ',
    '  tTTTTt  ',
    ' tTTTTTTt ',
    '  tt  tt  ',
  ],
  // 6. Smol Dragon (Violet)
  [
    '      vv     ',
    '     vVVv    ',
    '    vVwVv    ',
    '   vVVVVVv   ',
    '  vVVVVVVVv  ',
    ' vvVvVvVvVv  ',
    ' vVvVvVvVvVv ',
    '  vVv   vVv  ',
    '  vvv   vvv  ',
  ]
];

export const PET_FACES: PetPart[] = [
  // 1. Happy
  [
    '            ',
    '            ',
    '  xx    xx  ',
    '  xx    xx  ',
    '            ',
    ' x        x ',
    '  xxxxxxxx  ',
    '            ',
  ],
  // 2. Kawaii ^w^
  [
    '            ',
    '            ',
    '  x  x  x  x  ',
    '   xx    xx   ',
    '            ',
    '    x  x    ',
    '   x xx x   ',
    '            ',
  ],
  // 3. Winking
  [
    '            ',
    '            ',
    ' xxxx  xx   ',
    ' xxxx  xx   ',
    '            ',
    '     x      ',
    '   xxxxxx   ',
    '            ',
  ],
  // 4. Grumpy
  [
    '            ',
    ' xx    xx   ',
    '  xx  xx    ',
    '   xxxx     ',
    '            ',
    '  xxxxxxxx  ',
    ' x        x ',
    '            ',
  ],
  // 5. Sleepy
  [
    '            ',
    '            ',
    '            ',
    ' xxxx  xxxx ',
    '            ',
    '    xxxx    ',
    '            ',
    '            ',
  ],
  // 6. Derp
  [
    '            ',
    '            ',
    ' xx    xx   ',
    'xx    xx    ',
    '            ',
    '      xx    ',
    '    xxxx    ',
    '   xx       ',
  ]
];

export const PET_FEATURES: PetPart[] = [
  // 1. No feature
  [...Array(12)].map(() => ' '.repeat(14)),
  // 2. Bunny Ears
  [
    '  kk    kk  ',
    ' kKKk  kKKk ',
    'kKKKKkkKKKKk',
    'kKKKKkkKKKKk',
    ' kKKk  kKKk ',
    ' kkk    kkk ',
    '            ',
    '            ',
  ],
  // 3. Unicorn Horn
  [
    '      a     ',
    '     aAa    ',
    '    a w a   ',
    '     aAa    ',
    '      a     ',
    '     A      ',
    '            ',
    '            ',
  ],
  // 4. Dragon Wings
  [
    'a          a',
    'Aa        aA',
    ' AAa    aAA ',
    '  AAa  aAA  ',
    '   AAaaAA   ',
    '    AAAA    ',
    '            ',
    '            ',
  ],
  // 5. Fluffy Tail (Side)
  [
    '          vv',
    '         vVVv',
    '        vVwVv',
    '         vVVv',
    '          vv',
    '            ',
    '            ',
    '            ',
  ],
  // 6. Crown
  [
    ' a w a w a  ',
    ' aaaaaaaaa  ',
    '  AAAAAAAA  ',
    '            ',
    '            ',
    '            ',
    '            ',
    '            ',
  ],
   // 7. Top Hat
  [
    '   xxxxxx   ',
    '  xssssssx  ',
    '  xssssssx  ',
    '  xssssssx  ',
    ' xxxxxxxxx  ',
    'xxxxxxxxxxxx',
    '            ',
    '            ',
  ],
   // 8. Nothing
  [...Array(12)].map(() => ' '.repeat(14)),
];