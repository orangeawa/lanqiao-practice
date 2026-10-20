const MockUrl = './data.json' // 定义请求地址
/**
 * @return {Array}  请求到的数组
 */
async function fetchCodeData() {
    // TODO：待补充代码 目标 1
    return (await axios.get(MockUrl)).data
}

// 根据数据绘制图表
function setChart(chart, data) {
    chart.setOption({
        title: {
            text: '代码量统计',
            left: 'center',
            top: 20,
        },

        series: [
            {
                name: 'Code Counter',
                type: 'treemap',
                data,
                itemStyle: {
                    gapWidth: 5,
                },
                // TODO：待补充代码 目标 3
                label: {
                    // TODO：待补充代码 目标 3
                    formatter: "{b}: {c}"
                },
                levels: [
                    {
                        color: [
                            '#FCB944',
                            '#80B7C2',
                            '#C48483',
                            '#F0663B',
                            '#75D180',
                        ],
                    },
                    {
                        colorSaturation: [0.35, 0.5],
                    },
                ],
            },
        ],
    })
}

window.onload = async () => {
    const dom = document.querySelector('#canvasContainer')
    const chart = echarts.init(dom)

    // 获取原始数据
    /** @type{[string,number][]} */
    const rawData = await fetchCodeData()

    // 处理后的数据
    const processedData = []
    // TODO：待补充代码 目标 2

    const stack = [processedData]

    for (const [path, value] of rawData) {
        const paths = path.split('/'), children = stack[paths.length] = [], name = paths.pop()
        stack[paths.length].push({name,children,value})
    }

    // TODO：END
    // 绘制图表
    setChart(chart, processedData)
}
