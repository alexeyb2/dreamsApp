export class MerkabaMath {
    constructor(origin, bottomShift, topShift, baseRadius) {
        this.origin = origin;       // центральная точка (👁️), вершина нижнего
        this.bottomShift = bottomShift; // смещение основания нижнего (🔺)
        this.topShift = topShift;       // смещение вершины верхнего (🔻)
        this.baseRadius = baseRadius;   // радиус основания
    }

    getPoints() {
        const { x, y, z } = this.origin;
        const r = this.baseRadius;
        const d = r / Math.sqrt(2);
        const sqrt3 = Math.sqrt(3);
        const half = r / 2;

        // Нижний тетраэдр (🔺): вершина в origin, основание смещено
        const bx = x - this.bottomShift.x;
        const bz = z - this.bottomShift.z;
        const bottomY = y - 0.8; // фиксированная высота основания (можно настроить)

        // Верхний тетраэдр (🔻): вершина смещена, основание вокруг origin
        const tx = x + this.topShift.x;
        const tz = z + this.topShift.z;
        const topY = y + 0.8; // высота вершины верхнего

        // Точки нижнего основания (🔺)
        const bottomBase = {
            '🟦': { x: bx - sqrt3 * half, y: bottomY, z: bz + half },
            '🟥': { x: bx + sqrt3 * half, y: bottomY, z: bz + half },
            '🟩': { x: bx,               y: bottomY, z: bz - r }
        };

        // Точки верхнего основания (🔻)
        const topBase = {
            '🔴': { x: tx + sqrt3 * half, y: topY, z: tz - half },
            '🔵': { x: tx - sqrt3 * half, y: topY, z: tz - half },
            '🟢': { x: tx,               y: topY, z: tz + r }
        };

        return {
            '👁️': origin,           // вершина нижнего
            '🟪': { x: tx, y: topY, z: tz }, // вершина верхнего
            ...bottomBase,
            ...topBase
        };
    }
}