interface _Points {
    name: string;
    coord: [number, number];
}

// 所有站点及坐标
let points: _Points[] = [
    { name: '站点1', coord: [620, 130] },
    { name: '站点2', coord: [575, 295] },
    { name: '站点3', coord: [222, 132] },
    { name: '站点4', coord: [121, 300] },
    { name: '站点5', coord: [324, 434] },
    { name: '站点6', coord: [423, 333] }
];

/**
 * 计算 pointA 和 pointB 两点间的距离并返回
 * @param {Object} pointA A 站点的数据对象
 * @param {Object} pointB B 站点的数据对象
 * return {number} A、B两站点间的直线距离。
 */
function distance(pointA: _Points, pointB: _Points): number {
    return Math.sqrt(Math.pow(pointA.coord[0] - pointB.coord[0], 2) + Math.pow(pointA.coord[1] - pointB.coord[1], 2));
}

function findOptimalRoute(points: _Points[]): _Points[] {
    const unvisited = [...points]; // 还没访问的站点
    const route: _Points[] = [];

    // 从第一个站点出发
    let current = unvisited.shift()!;
    route.push(current);

    while (unvisited.length > 0) {
        // 找离当前点最近的站点
        let nearestIndex = 0;
        let nearestDistance = distance(current, unvisited[0]);
        for (let i = 1; i < unvisited.length; i++) {
            const d = distance(current, unvisited[i]);
            if (d < nearestDistance) {
                nearestIndex = i;
                nearestDistance = d;
            }
        }
        // 选中最近的点，加入路线
        current = unvisited.splice(nearestIndex, 1)[0];
        route.push(current);
    }

    return route;
}


findOptimalRoute(points);