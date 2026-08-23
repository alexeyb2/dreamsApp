export class MerkabaMath {
    /**
     * @param {number} h - высота между вершиной нижнего и его основанием (по Y)
     * @param {number} l - радиус описанной окружности основания
     * @param {object} origin - точка 👁️ (вершина нижнего тетраэдра) {x,y,z}
     * @param {object} bottomShift - смещение основания нижнего от вершины {x,z}
     * @param {object} topShift - смещение вершины верхнего от его основания {x,z}
     */
    constructor(h, l, origin = {x:0,y:0,z:0}, bottomShift = {x:0,z:0}, topShift = {x:0,z:0}) {
        this.h = h;
        this.l = l;
        this.origin = origin;
        this.bottomShift = bottomShift;
        this.topShift = topShift;
    }

    getPoints() {
        const d = this.l / Math.sqrt(2);
        const sqrt3 = Math.sqrt(3);
        const halfL = this.l / 2;
        const sqrt3halfL = sqrt3 * halfL;
        const { x, y, z } = this.origin;

        // ---------- НИЖНИЙ ТЕТРАЭДР (🔺) ----------
        // Вершина (👁️) остаётся в origin, основание сдвигается на -bottomShift (т.е. направление взгляда нижнего - это вектор от вершины к основанию)
        const bx = x - this.bottomShift.x;
        const bz = z - this.bottomShift.z;
        const bottomBaseY = y - this.h;

        // ---------- ВЕРХНИЙ ТЕТРАЭДР (🔻) ----------
        // Основание (🔴🔵🟢) строится вокруг origin (без смещения), вершина (🟪) сдвигается на +topShift
        const topBaseY = y - this.h + 2 * d;
        const tx = x + this.topShift.x;
        const tz = z + this.topShift.z;
        const topVertexY = y - 2 * this.h + 2 * d;

        return {
            // вершина нижнего
            '👁️': { x, y, z },
            // основание нижнего
            '🟦': { x: bx - sqrt3halfL, y: bottomBaseY, z: bz + halfL },
            '🟥': { x: bx + sqrt3halfL, y: bottomBaseY, z: bz + halfL },
            '🟩': { x: bx,             y: bottomBaseY, z: bz - this.l },
            // основание верхнего
            '🔴': { x: x + sqrt3halfL, y: topBaseY, z: z - halfL },
            '🔵': { x: x - sqrt3halfL, y: topBaseY, z: z - halfL },
            '🟢': { x: x,             y: topBaseY, z: z + this.l },
            // вершина верхнего
            '🟪': { x: tx, y: topVertexY, z: tz }
        };
    }
}