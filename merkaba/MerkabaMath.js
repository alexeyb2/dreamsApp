export class MerkabaMath {
    /**
     * @param {object} bottomVertex - вершина нижнего тетраэдра {x,y,z}
     * @param {object} bottomBase - центр основания нижнего {x,y,z}
     * @param {object} topVertex - вершина верхнего {x,y,z}
     * @param {object} topBase - центр основания верхнего {x,y,z}
     * @param {number} radius - радиус основания
     */
    constructor(bottomVertex, bottomBase, topVertex, topBase, radius) {
        this.bottomVertex = bottomVertex;
        this.bottomBase = bottomBase;
        this.topVertex = topVertex;
        this.topBase = topBase;
        this.radius = radius;
    }

    getPoints() {
        const r = this.radius;
        const sqrt3 = Math.sqrt(3);
        const half = r / 2;

        const b = this.bottomBase;
        const bottomPts = {
            '🟦': { x: b.x - sqrt3 * half, y: b.y, z: b.z + half },
            '🟥': { x: b.x + sqrt3 * half, y: b.y, z: b.z + half },
            '🟩': { x: b.x, y: b.y, z: b.z - r }
        };

        const t = this.topBase;
        const topPts = {
            '🔴': { x: t.x + sqrt3 * half, y: t.y, z: t.z - half },
            '🔵': { x: t.x - sqrt3 * half, y: t.y, z: t.z - half },
            '🟢': { x: t.x, y: t.y, z: t.z + r }
        };

        return {
            '👁️': this.bottomVertex,
            '🟪': this.topVertex,
            ...bottomPts,
            ...topPts
        };
    }
}