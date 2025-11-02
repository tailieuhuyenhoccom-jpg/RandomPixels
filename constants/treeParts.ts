
type TreePart = string[];

// g, G, h, H: Green tones
// l, L: Lime/lighter green tones
// f, F: Flower/Fruit tones (Pink/Red)
// y: Yellow/Autumn tones
export const CANOPIES: TreePart[] = [
  // 1. Majestic Oak - Rộng lớn, có bóng râm
  [
    '        gGg        ',
    '      gGhHhGg      ',
    '    gGhhhhhhhGg    ',
    '   gghhhHhhhhhgg   ',
    ' gGhhhghhhghhhhGg ',
    'gGhhggh hgghhgGhhg',
    'gghhgg   gghhghhgg',
    ' Gghh     ghhghG ',
    '  hGg     gGh  ',
  ],
  // 2. Weeping Willow - Rủ xuống
  [
    '      gHhg      ',
    '     GhhhhG     ',
    '    g hhh ghg   ',
    '   g H h H g g  ',
    '  g  h g h  g G ',
    ' g  G h g  g h g',
    'g h  h g   G  Hg',
    ' g g G g h  h g ',
    '  g   g  g   g  ',
  ],
  // 3. Cherry Blossom - Hoa anh đào
  [
    '      fFf      ',
    '    fFfHhFfg   ',
    '   gffFhhFffg  ',
    '  gFfhhhhhFfg  ',
    ' gFfhhghhhhfFg ',
    'gFfghhghhhgfFfg',
    ' fFghhhhhhgfFf ',
    '  ghgghhgghg   ',
  ],
  // 4. Round Maple - Tán lá rậm rạp
  [
    '      ggggg      ',
    '    ggHhhHhgg    ',
    '  ggGhhhhhhhGgg  ',
    ' gghhGhhhhhGhhgg ',
    'gghhhhhhhhhhhhhgg',
    'gghgGhgghgGhgghgg',
    ' gghhhhhhhhhhhgg ',
    '  GGhghgghghgGG  ',
    '    gGg   gGg    ',
  ],
  // 5. Layered Pine - Cây thông nhiều lớp
  [
    '      g      ',
    '     gHg     ',
    '    gHhHg    ',
    '   gGhhhGg   ',
    '  gGhhhhhGg  ',
    ' gHhhHhhHhhg ',
    'GhhhhhhhhhhG',
    '  hGg   gGh  ',
  ],
  // 6. Autumn Birch - Cây bạch dương mùa thu
  [
    '    yyy y    ',
    '   y yyy yy  ',
    '  y ygyygy y ',
    ' y gygyygyg y',
    'y ggygyggygy y',
    ' yggyggyggygy ',
    '  y ggyggy y ',
    '    y yg y   ',
  ],
  // 7. Bonsai Style - Dáng bonsai
  [
    '      gg       ',
    '     gHhg ggg  ',
    ' ggg GHHhgHhg  ',
    'gHhHg hhh ggg ',
    ' ggg  gHhHgHhg ',
    '      ggg ggg  ',
  ],
  // 8. Fruiting Apple Tree - Cây táo sai quả
  [
    '    g gFg g    ',
    '   gHhghhHhg   ',
    '  gGhhFhhhhGg  ',
    ' gGhhhhhghhhGg ',
    'gghhhFgFhhhhhgg',
    'gghFghhghhghhgg',
    ' gghhhhhFhhhgg ',
    '  GGhghgghgGG  ',
  ],
  // 9. Tall Cypress - Cây bách cao
  [
    '     g     ',
    '    gHg    ',
    '   gHhHg   ',
    '  gGhhhGg  ',
    ' gGhhhhhGg ',
    ' gGhhhhhGg ',
    'gGhhhhhhhGg',
    ' GghhhghhG ',
    '  hghghg   ',
  ],
  // 10. Sparse Desert Tree - Cây sa mạc thưa lá
  [
    '   g g    g   ',
    '  g   g g   g  ',
    '   g g   g g   ',
    '    g g g   g  ',
    '   g   g g   g ',
    '  g g   g g g  ',
    ' g   g g   g   ',
  ],
];

// b, B, n: Brown tones
// X: Scar/Knot tone
export const TRUNKS: TreePart[] = [
  // 1. Gnarled & Old - Thân cây già cỗi, sần sùi
  [
    '    bBnB    ',
    '   bBXXnb   ',
    '   bXBBnb   ',
    '    BnBb    ',
    '    bBnb    ',
    '    BnnB    ',
  ],
  // 2. Twisted - Thân cây xoắn
  [
    '    bB   ',
    '   nb    ',
    '  Bnb    ',
    '  bBn    ',
    ' bnb     ',
    ' bB      ',
    ' n       ',
  ],
  // 3. Thick & Sturdy - Thân cây dày, chắc chắn
  [
    '  bbbbbb  ',
    '  bBnnBb  ',
    ' bBnBBnb b',
    ' bBBnnBb b',
    ' bBnnBBnb ',
    '  bBBBBb  ',
  ],
  // 4. Smooth & Tall - Thân cây nhẵn, cao
  [
    '   bB   ',
    '   Bn   ',
    '   nB   ',
    '   Bn   ',
    '   bB   ',
    '   Bn   ',
    '   nB   ',
    '   bB   ',
  ],
  // 5. Forked - Thân cây chẻ nhánh
  [
    '  bB  nB  ',
    ' bB    nb ',
    ' n      B ',
    '  n    B  ',
    '   n  B   ',
    '    nb    ',
    '    Bb    ',
  ],
  // 6. Hollowed Out - Thân cây có hốc
  [
    '   bBBb   ',
    '  bB  Bb  ',
    ' bB    nb ',
    ' bB    nb ',
    '  bB  Bb  ',
    '   bBBb   ',
  ],
  // 7. Leaning - Thân cây nghiêng
  [
    '      bB  ',
    '     Bn   ',
    '    nB    ',
    '   Bn     ',
    '  bB      ',
    ' Bn       ',
  ],
  // 8. Short & Thick - Thân cây lùn, dày
  [
    '  bBnnbB  ',
    ' bBnnnnBb ',
    'bBnnnnnnBb',
    ' bBBBBBBb ',
  ],
  // 9. Root Flare - Thân cây loe ra ở gốc
  [
    '    Bn    ',
    '   bBb   ',
    '  bnbn   ',
    ' bBBBBb ',
    'bBnnnnBb',
  ],
  // 10. Multi-Trunk - Thân cây nhiều nhánh
  [
    ' bB nB bB ',
    ' Bn bB Bn ',
    ' nB Bn nB ',
    ' bB nB bB ',
    ' Bn bB Bn ',
  ],
];

// r, R: Root/Earth tones
export const ROOTS: TreePart[] = [
  // 1. Buttress Roots - Rễ bạnh
  [
    'bBBBBBBBBb',
    'Rr RrRr Rr',
    'r   r  r  ',
  ],
  // 2. Tangled Mess - Rễ chằng chịt
  [
    '  bBnnnnBb  ',
    ' rR rR rR rR ',
    'R rR r Rr r R',
    ' r Rr R r Rr ',
  ],
  // 3. Surface Runners - Rễ bò trên mặt đất
  [
    '   bBBb   ',
    'rrrrrrrrrrrr',
    'r r R r Rr r',
  ],
  // 4. Gripping Rocks - Rễ bám đá
  [
    '   bnnB   ',
    '  rRcCrb  ',
    ' rRCCCcr ',
    'r cCr rR r',
  ],
  // 5. Exposed & Weathered - Rễ lộ thiên
  [
    '   bBnb   ',
    ' Rr    rR ',
    'r  Rrr   r',
    ' R   rR r ',
  ],
  // 6. Smooth Mound - Rễ tạo thành ụ đất
  [
    '  bBBBBb  ',
    ' rRRRRRRr ',
    'rRRRRRRRRr',
  ],
  // 7. Asymmetrical - Rễ mọc lệch
  [
    '   bBnb   ',
    '  rR rrr  ',
    ' r  rR rR ',
    'R     r   ',
  ],
  // 8. Deep Taproot - Rễ cọc
  [
    '   bBnb   ',
    '  r bB r  ',
    ' r nBnn r ',
    '  r nB r  ',
    '   rRr   ',
    '    r    ',
    '    R    ',
  ],
  // 9. Widespread - Rễ lan rộng
  [
    '    Bn    ',
    ' r RrRr R r ',
    'r   r  r   r',
  ],
  // 10. Minimalist - Rễ tối giản
  [
    '   bBBb   ',
    '  R r  r R  ',
    ' r      r ',
  ],
];

// u, U: grass
// m, M, w: mushroom
// c, C: rocks
// z, Z: flowers
// y: fallen leaves
export const GROUND_COVERS: TreePart[] = [
  // 1. Lush Meadow - Đồng cỏ tươi tốt
  [
    'zZ u U zZ u Uu',
    'Uu u zZ uU u zZ',
    ' uUu Uu u Uu u',
  ],
  // 2. Mushroom Circle - Vòng nấm
  [
    '  u mwm uUu  ',
    ' uU mwm mwm u ',
    'uUuUuUuUuUuUu',
  ],
  // 3. Rocky Outcrop - Mỏm đá
  [
    '  c C u cC u ',
    ' uC cC c u C c',
    'cC c u C cC u ',
  ],
  // 4. Fallen Leaves - Lá rụng
  [
    ' u y Uu y u y ',
    'y uUu y uUu yU',
    ' U y uUu y u u',
  ],
  // 5. Flower Bed - Luống hoa
  [
    'zZ zZ u zZ zZ u',
    'Zz Zz zZ Zz Zz zZ',
    'u zZ u u zZ u ',
  ],
  // 6. Overgrown Path - Lối đi um tùm
  [
    'uUu cC uUuUu',
    'uU cCC c uUu',
    'u cCCC cC uU',
    'uU cC u c uU',
    'UuUuUu cC uU',
  ],
  // 7. Mossy Ground - Mặt đất phủ rêu
  [
    ' h u h U h u ',
    'Uu h Uu hh Uu',
    ' h Uu h uU h ',
  ],
  // 8. Wildflowers & Rocks - Hoa dại và đá
  [
    'zZ cC u zZ c ',
    'uU C c zZ uUu',
    'c u zZ cC u zZ',
  ],
  // 9. Tall Grass & Boulders - Cỏ cao và tảng đá
  [
    'uU C C u U u',
    ' U cC C U u U',
    'u U u cC U u',
  ],
  // 10. Peaceful Glade - Trảng cỏ yên bình
  [
    'uUuUuUuUuUuUuU',
    ' u mwm u cC u ',
    'uUuUuUuUuUuUuU',
  ]
];