export class MerkabaMath {
    constructor(bottomVertex, bottomBase, topVertex, topBase, radius, bottomAngle, bottomTilt, topAngle, topTilt) {
        this.bottomVertex = bottomVertex; // {x,y,z} – вершина нижнего
        this.topVertex = topVertex;       // {x,y,z} – вершина верхнего
        this.bottomBase = bottomBase;     // {x,y,z} – центр основания нижнего (будет пересчитан)
        this.topBase = topBase;           // {x,y,z} – центр основания верхнего (будет пересчитан)
        this.radius = radius;
        this.bottomAngle = bottomAngle;   // градусы
        this.bottomTilt = bottomTilt;     // 0..1
        this.topAngle = topAngle;
        this.topTilt = topTilt;
    }

    _computeBase(vertex, angleDeg, tilt) {
        const r = this.radius;
        const sqrt3 = Math.sqrt(3);
        const half = r / 2;
        const angleRad = angleDeg * Math.PI / 180;

        // Смещение центра основания относительно вершины (наклон)
        const offsetX = Math.cos(angleRad) * tilt;
        const offsetZ = Math.sin(angleRad) * tilt;
        const cx = vertex.x + offsetX;
        const cz = vertex.z + offsetZ;

        // Точки равностороннего треугольника без поворота
        const basePts = [
            { x: -sqrt3 * half, z: half },
            { x: sqrt3 * half, z: half },
            { x: 0, z: -r }
        ];

        // Поворот треугольника вокруг вертикали (Y) на angle
        const cosA = Math.cos(angleRad);
        const sinA = Math.sin(angleRad);

        return basePts.map(p => {
            const x = p.x * cosA - p.z * sinA;
            const z = p.x * sinA + p.z * cosA;
            return { x: cx + x, z: cz + z };
        });
    }

    getPoints() {
        const bottomBasePts = this._computeBase(this.bottomVertex, this.bottomAngle, this.bottomTilt);
        const topBasePts = this._computeBase(this.topVertex, this.topAngle, this.topTilt);

        return {
            '👁️': this.bottomVertex,
            '🟪': this.topVertex,
            '🟦': bottomBasePts[0],
            '🟥': bottomBasePts[1],
            '🟩': bottomBasePts[2],
            '🔴': topBasePts[0],
            '🔵': topBasePts[1],
            '🟢': topBasePts[2]
        };
    }
}