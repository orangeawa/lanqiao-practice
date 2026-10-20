// 所有站点及坐标
var points = [
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
function distance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.coord[0] - pointB.coord[0], 2) + Math.pow(pointA.coord[1] - pointB.coord[1], 2));
}

/**
 * 通过计算得出最短路线，并返回所有站点的到达顺序
 * @param {{ name: string, coord: [number, number] }[]} points 所有站点的数组
 * @return {Array} route 规划好的最短路线的所有站点数组
 */
function findOptimalRoute(points) {
    // TODO：待补充代码 目标 1
    const route = [points[0]], unvisited = points.slice(1);
    while (unvisited.length) {
        let next = unvisited.reduce((a, b) => distance(route[route.length - 1], a) < distance(route[route.length - 1], b) ? a : b);
        route.push(next);
        unvisited.splice(unvisited.indexOf(next), 1);
    }
    return route;
}
// 拼车路线的起点、终点和路径点
const routeData = findOptimalRoute(points);
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option = {
    graphic: {
        type: 'image',
        id: 'background',
        left: -100,
        top: 0,
        z: -10,
        bounding: 'raw',
        origin: [0, 0],
        style: {
            image: './images/view.jpg',
            width: 1000,
            height: 600
        }
    },
    tooltip: {
        trigger: 'item'
    },
    geo: {
        map: 'china',
        roam: true,
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [
        {
            name: '路线',
            type: 'lines',
            coordinateSystem: 'geo',
            // TODO：待补充代码 目标 2
            data: routeData.slice(0, -1).map((p, i) => ({ coords: [p.coord, routeData[i + 1].coord] })),
            lineStyle: {
                normal: {
                    color: '#05abf4',
                    width: 2
                }
            }
        },
        {
            name: '节点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            // TODO：待补充代码 目标 3
            data: routeData.map(p => ({ name: p.name, value: [...p.coord, 10] })),
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#05abf4',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};

option && myChart.setOption(option);