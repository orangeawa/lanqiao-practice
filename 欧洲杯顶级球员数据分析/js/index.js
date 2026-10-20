var myChart = echarts.init(document.getElementById('main'));
var dataList = []; // 存储 data.json 中的所有数据
var MockURL = './js/data.json';
/**
 * 获取指定条件下的图表数据
 * @param {Array} dataList data.json 中的所有数据
 * @param {String} year 选择展示数据的年份，例：'2021'
 */
function showData(dataList,year) {
    try {
      
      
      // 设置图表选项
      var option = {
          graphic: {
              type: 'image',
              id: 'background',
              left: 0,
              top: 0,
              z: -10,
              bounding: 'raw',
              origin: [0, 0],
              style: {
                  image: './images/football.svg',
                  width: 900,
                  height: 600
              }
          },
          xAxis: {
              type: 'value',
              min: 0,
              max: 100,
              axisTick: {
                  show: false
              },
              axisLabel: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              splitLine: {
                  show: false
              }
          },
          yAxis: {
              type: 'value',
              min: 0,
              max: 100,
              axisTick: {
                  show: false
              },
              axisLabel: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              splitLine: {
                  show: false
              }
          },
          series: [
              {
                  name: 'Missed',
                  type: 'scatter',
                  data: [[70,67],[88.5,50],[87.9,50],[74.5,47.4],[86,70.5],[88.5,50]],
                  itemStyle: {
                      color: '#808080',
                      opacity: 0.4
                  },
                  symbolSize: 10
              },
              {
                  name: 'Scored',
                  type: 'scatter',
                  data: [[72.5,44.7],[72.1,38.4],[91.9,51.7],[75,76.9],[76.5,32.5],[90.9,66.5]],
                  itemStyle: {
                      color: '#0000ff',
                      opacity: 0.4
                  },
                  symbolSize: 10
              }
          ]
      };
        // TODO：待补充代码 目标 2
        // 初始化容器
        const groups = [[], []];

        // ⚡ 一行核心逻辑：利用 result === 'Goal' 的布尔值作为数组索引 (0 或 1)
        dataList.forEach(item => (year === 'all' || item.season === year) && groups[+(item.result === 'Goal')].push([item.X * 100, item.Y * 100]));

        [option.series[0].data, option.series[1].data] = groups;
        myChart.setOption(option);
       
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// 根据选择年份更新图表数据
function updateData() {
    // TODO：待补充代码 目标 3
  showData(dataList,document.querySelector('#year').value) 
}

(async () => {
  // TODO：待补充代码 目标 1
  dataList = (await axios.get(MockURL)).data;
  // 将获取到的数据显示在图表中
  showData(dataList,'all') 
})()