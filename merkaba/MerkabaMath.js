// MerkabaMath.js
// Класс для расчёта координат двух тетраэдров (Меркаба)
// Соответствует требованиям: порядок высот, оси, формулы смещения и основания.

class MerkabaMath {
    constructor() {
        // Углы (градусы)
        this.topAngle = 0;          // верхний тетраэдр (🔻)
        this.bottomAngle = 0;       // нижний тетраэдр (🔺)

        // Наклон (смещение вершины относительно центра основания)
        this.topTilt = 0.3;
        this.bottomTilt = 0.3;

        // Высоты вершин
        this.topHeight = 0.5;       // вершина верхнего (🟪) – самая низкая
        this.bottomHeight = 2.8;    // вершина нижнего (👁️) – самая высокая

        // Смещения основания по вертикали
        this.topBaseOffset = 1.9;   // основание верхнего выше вершины на 1.9 → y = 0.5 + 1.9 = 2.4
        this.bottomBaseOffset = 0.6; // основание нижнего ниже вершины на 0.6 → y = 2.8 - 0.6 = 2.2

        // Радиус описанной окружности основания
        this.radius = 1.5;

        // Связь вращения (нижний = верхний + 180°)
        this.linkRotation = false;
    }

    // Преобразование градусов в радианы
    _toRad(deg) {
        return deg * Math.PI / 180;
    }

    // Получение всех точек (для экспорта и визуализации)
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

    // Нижний тетраэдр (🔺): вершина (👁️) на высоте bottomHeight,
    // основание на высоте bottomHeight - bottomBaseOffset (ниже вершины)
    getBottomTetrahedron() {
        const angle = this.bottomAngle;
        const tilt = this.bottomTilt;
        const height = this.bottomHeight;
        const baseY = height - this.bottomBaseOffset;
        const R = this.radius;
        const rad = this._toRad(angle);

        // Смещение вершины относительно центра основания:
        // x = tilt * sin(angle), z = tilt * cos(angle)
        const apex = {
            x: tilt * Math.sin(rad),
            y: height,
            z: tilt * Math.cos(rad)
        };

        // Центр основания (в точке (0, baseY, 0))
        const baseCenter = {
            x: 0,
            y: baseY,
            z: 0
        };

        // Вершины основания – равносторонний треугольник:
        // x = R * sin(angle + i*120°), z = R * cos(angle + i*120°)
        const baseVerts = [];
        for (let i = 0; i < 3; i++) {
            const a = rad + i * (2 * Math.PI / 3);
            baseVerts.push({
                x: R * Math.sin(a),
                y: baseY,
                z: R * Math.cos(a)
            });
        }

        return { apex, baseVerts, baseCenter };
    }

    // Верхний тетраэдр (🔻): вершина (🟪) на высоте topHeight,
    // основание на высоте topHeight + topBaseOffset (выше вершины)
    getTopTetrahedron() {
        const angle = this.topAngle;
        const tilt = this.topTilt;
        const height = this.topHeight;
        const baseY = height + this.topBaseOffset;
        const R = this.radius;
        const rad = this._toRad(angle);

        // Вершина (смещение по формулам sin/cos)
        const apex = {
            x: tilt * Math.sin(rad),
            y: height,
            z: tilt * Math.cos(rad)
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
                x: R * Math.sin(a),
                y: baseY,
                z: R * Math.cos(a)
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

    // Экспорт JSON (все точки и параметры)
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