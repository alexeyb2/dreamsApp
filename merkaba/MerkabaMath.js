// MerkabaMath.js
// Класс для расчёта координат точек двух тетраэдров (Меркаба)

class MerkabaMath {
    constructor() {
        // Углы (градусы)
        this.topAngle = 0;          // верхний тетраэдр (🔻)
        this.bottomAngle = 0;       // нижний тетраэдр (🔺)

        // Наклон (смещение вершины относительно центра основания по X/Z)
        this.topTilt = 0.3;
        this.bottomTilt = 0.3;

        // Высоты вершин
        this.topHeight = 1.8;       // вершина верхнего тетраэдра
        this.bottomHeight = 1.3;    // вершина нижнего тетраэдра

        // Смещения основания (по вертикали)
        this.topBaseOffset = 0.6;   // основание верхнего выше вершины
        this.bottomBaseOffset = 0.6; // основание нижнего ниже вершины

        // Радиус описанной окружности основания
        this.radius = 1.5;

        // Связь вращения (нижний = верхний + 180°)
        this.linkRotation = false;
    }

    // Преобразование градусов в радианы
    _toRad(deg) {
        return deg * Math.PI / 180;
    }

    // Получение всех точек (для экспорта JSON и визуализации)
    getPoints() {
        const bottom = this.getBottomTetrahedron();
        const top = this.getTopTetrahedron();

        return {
            '👁️': bottom.apex,
            '🟦': bottom.baseVerts[0],
            '🟥': bottom.baseVerts[1],
            '🟩': bottom.baseVerts[2],
            '🟪': top.apex,
            '🔴': top.baseVerts[0],
            '🔵': top.baseVerts[1],
            '🟢': top.baseVerts[2]
        };
    }

    // Нижний тетраэдр (🔺)
    // Вершина (👁️) на высоте bottomHeight,
    // основание (🟦🟥🟩) на высоте bottomHeight - bottomBaseOffset (ниже вершины)
    getBottomTetrahedron() {
        const angle = this.bottomAngle;
        const tilt = this.bottomTilt;
        const height = this.bottomHeight;
        const baseY = height - this.bottomBaseOffset;
        const R = this.radius;
        const rad = this._toRad(angle);

        // Вершина (смещена относительно центра основания)
        const apex = {
            x: tilt * Math.cos(rad),
            y: height,
            z: tilt * Math.sin(rad)
        };

        // Центр основания (X=0, Z=0, Y=baseY)
        const baseCenter = {
            x: 0,
            y: baseY,
            z: 0
        };

        // Вершины основания (равносторонний треугольник, повернут на угол)
        const baseVerts = [];
        for (let i = 0; i < 3; i++) {
            const a = rad + i * (2 * Math.PI / 3);
            baseVerts.push({
                x: R * Math.cos(a),
                y: baseY,
                z: R * Math.sin(a)
            });
        }

        return { apex, baseVerts, baseCenter };
    }

    // Верхний тетраэдр (🔻)
    // Вершина (🟪) на высоте topHeight,
    // основание (🔴🔵🟢) на высоте topHeight + topBaseOffset (выше вершины)
    getTopTetrahedron() {
        const angle = this.topAngle;
        const tilt = this.topTilt;
        const height = this.topHeight;
        const baseY = height + this.topBaseOffset;
        const R = this.radius;
        const rad = this._toRad(angle);

        // Вершина
        const apex = {
            x: tilt * Math.cos(rad),
            y: height,
            z: tilt * Math.sin(rad)
        };

        // Центр основания
        const baseCenter = {
            x: 0,
            y: baseY,
            z: 0
        };

        // Вершины основания
        const baseVerts = [];
        for (let i = 0; i < 3; i++) {
            const a = rad + i * (2 * Math.PI / 3);
            baseVerts.push({
                x: R * Math.cos(a),
                y: baseY,
                z: R * Math.sin(a)
            });
        }

        return { apex, baseVerts, baseCenter };
    }

    // Определение направления по углу (0° = ⬆️, 90° = ➡️, 180° = ⬇️, 270° = ⬅️)
    static directionFromAngle(angle) {
        angle = ((angle % 360) + 360) % 360;
        const dirs = ['⬆️', '↗️', '➡️', '↘️', '⬇️', '↙️', '⬅️', '↖️'];
        const idx = Math.round(angle / 45) % 8;
        return dirs[idx];
    }

    // Экспорт JSON (как в задании)
    getJSON() {
        const points = this.getPoints();
        return {
            "top": {
                "angle": this.topAngle,
                "tilt": this.topTilt,
                "height": this.topHeight,
                "direction": MerkabaMath.directionFromAngle(this.topAngle)
            },
            "bottom": {
                "angle": this.bottomAngle,
                "tilt": this.bottomTilt,
                "height": this.bottomHeight,
                "direction": MerkabaMath.directionFromAngle(this.bottomAngle)
            },
            "radius": this.radius,
            "linkRotation": this.linkRotation,
            "points": {
                "👁️": points['👁️'],
                "🟪": points['🟪'],
                "🟦": points['🟦'],
                "🟥": points['🟥'],
                "🟩": points['🟩'],
                "🔴": points['🔴'],
                "🔵": points['🔵'],
                "🟢": points['🟢']
            }
        };
    }
}