export class MerkabaMath {
    /**
     * Строит два тетраэдра: нижний (вершина внизу) и верхний (вершина вверху).
     * Каждый тетраэдр задаётся вершиной, центром основания и радиусом.
     * Основание — равносторонний треугольник в горизонтальной плоскости.
     */
    constructor(bottomVertex, bottomBase, topVertex, topBase, radius) {
        this.bottomVertex = bottomVertex;   // {x,y,z} – вершина нижнего
        this.bottomBase = bottomBase;       // {x,y,z} – центр основания нижнего
        this.topVertex = topVertex;         // {x,y,z} – вершина верхнего
        this.topBase = topBase;             // {x,y,z} – центр основания верхнего
        this.radius = radius;
    }

    getPoints() {
        const r = this.radius;
        const sqrt3 = Math.sqrt(3);
        const half = r / 2;

        // Точки основания нижнего тетраэдра
        const b = this.bottomBase;
        const bottomBasePts = {
            '🟦': { x: b.x - sqrt3 * half, y: b.y, z: b.z + half },
            '🟥': { x: b.x + sqrt3 * half, y: b.y, z: b.z + half },
            '🟩': { x: b.x, y: b.y, z: b.z - r }
        };

        // Точки основания верхнего тетраэдра
        const t = this.topBase;
        const topBasePts = {
            '🔴': { x: t.x + sqrt3 * half, y: t.y, z: t.z - half },
            '🔵': { x: t.x - sqrt3 * half, y: t.y, z: t.z - half },
            '🟢': { x: t.x, y: t.y, z: t.z + r }
        };

        return {
            '👁️': this.bottomVertex,   // вершина нижнего
            '🟪': this.topVertex,       // вершина верхнего
            ...bottomBasePts,
            ...topBasePts
        };
    }
}