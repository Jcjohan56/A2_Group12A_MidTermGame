// levels.js
const levelData = [
  {
    // Level 0: Tutorial
    hint: "Drag the yellow block to the right exit!",
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 3, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
    ],
  },
  {
    // Level 1: First Challenge
    hint: "Clear the path!",
    blocks: [
      // ... more block data here
    ],
  },
];
