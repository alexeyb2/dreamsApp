// MerkabaMath.js
export class MerkabaMath {
    /**
     * @param {number} h - Расстояние от 👁️ до основания (по вертикали Y) в метрах.
     * @param {number} l - Радиус описанной окружности основания в метрах.
     * @param {object} origin - Координаты точки 👁️ в пространстве {x, y, z} в метрах.
     */
    constructor(h, l, origin = {x: 0, y: 0, z: 0}) {
        this.h = h;
        this.l = l;
        this.origin = origin; // Точка, за которую мы держим Меркабу (👁️)
    }

    getPoints() {
        const d = this.l / Math.sqrt(2);
        const sqrt3 = Math.sqrt(3);
        const halfL = this.l / 2;
        const sqrt3halfL = sqrt3 * halfL;
        const { x, y, z } = this.origin;

        // Возвращаем JSON с абсолютными координатами в пространстве
        return {
            '🟦': { x: x - sqrt3halfL, y: y - this.h, z: z + halfL },
            '🟥': { x: x + sqrt3halfL, y: y - this.h, z: z + halfL },
            '🟩': { x: x,             y: y - this.h, z: z - this.l },
            
            '🔴': { x: x + sqrt3halfL, y: y - this.h + 2*d, z: z - halfL },
            '🔵': { x: x - sqrt3halfL, y: y - this.h + 2*d, z: z - halfL },
            '🟢': { x: x,             y: y - this.h + 2*d, z: z + this.l },
            
            '👁️': { x: x, y: y, z: z },
            // Математически выверенная формула для нижней вершины
            '🟪': { x: x, y: y - 2*this.h + 2*d, z: z }
        };
    }
}