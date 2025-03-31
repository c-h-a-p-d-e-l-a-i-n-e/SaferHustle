export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function generateRandomPoint(baseX: number, rangeX: number, baseY: number, rangeY: number): [number, number] {
  const x = Math.max(0, Math.min(100, baseX + getRandomNumber(-rangeX, rangeX)));
  const y = Math.max(0, Math.min(100, baseY + getRandomNumber(-rangeY, rangeY)));
  return [x, y];
}

export function generateRandomClipPath(): string {
  // Generate number of points for each edge
  const topPoints = Math.floor(getRandomNumber(5, 8));
  const rightPoints = Math.floor(getRandomNumber(4, 6));
  const bottomPoints = Math.floor(getRandomNumber(5, 8));
  const leftPoints = Math.floor(getRandomNumber(4, 6));

  const points: [number, number][] = [];

  // Top edge
  for (let i = 0; i <= topPoints; i++) {
    const baseX = (i / topPoints) * 100;
    points.push(generateRandomPoint(baseX, 4, 0, 3));
  }

  // Right edge
  for (let i = 1; i < rightPoints; i++) {
    const baseY = (i / rightPoints) * 100;
    points.push(generateRandomPoint(100, 3, baseY, 5));
  }

  // Bottom edge (reverse direction)
  for (let i = bottomPoints; i >= 0; i--) {
    const baseX = (i / bottomPoints) * 100;
    points.push(generateRandomPoint(baseX, 4, 100, 3));
  }

  // Left edge (going up)
  for (let i = leftPoints - 1; i > 0; i--) {
    const baseY = (i / leftPoints) * 100;
    points.push(generateRandomPoint(0, 3, baseY, 5));
  }

  return `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;
}

export function generateRandomRotation(): string {
  const angle = getRandomNumber(-1.2, 1.2);
  return `rotate(${angle}deg)`;
}