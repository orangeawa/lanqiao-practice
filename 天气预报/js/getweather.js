
const weatherCache = new WeatherCache();

// 天气类型
const weatherTypes = [
  { name: '晴天', minTemp: 25, maxTemp: 35, className: 'sunny', icon: '☀️' },
  { name: '多云', minTemp: 20, maxTemp: 30, className: 'cloudy', icon: '☁️' },
  { name: '雨天', minTemp: 18, maxTemp: 28, className: 'rainy', icon: '🌧️' }
];
// 获取天气 API ，生成随机天气
const WeatherAPI = (() => {
  async function fetchWeather(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        // 随机生成温度
        const temperature = Math.floor(
          Math.random() * (randomWeather.maxTemp - randomWeather.minTemp + 1) + randomWeather.minTemp
        );

        resolve({
          city,
          temperature: temperature.toFixed(1),
          condition: randomWeather.name
        });
      }, 300);
    });
  }

  return {
    fetchWeather
  };
})();

const weatherOutput = document.getElementById('weatherOutput');
function showTip(tip) {
  weatherOutput.innerHTML = `<p class="tip">${tip}</p>`;
}
// TODO 目标2 待补充代码（获取天气数据）
const cityInput = document.getElementById('cityInput')
async function getWeather() {
  const content = cityInput.value
  if (!content) return showTip('请输入一个城市名。')

  const w = weatherCache.get(content)
  if (w) return displayWeather(w)
  
  showTip('加载中...')
  WeatherAPI.fetchWeather(content).then(a => {
    weatherCache.set(content, a)
    displayWeather(a)
  }).catch(() => showTip('获取天气数据失败。'))
}
// TODO END

// 显示天气数据
function displayWeather(data) {
  const weather = weatherTypes.find((type) => type.name === data.condition);

  const weatherClass = weather.className;
  const iconSymbol = weather.icon;

  document.getElementById('weatherOutput').innerHTML = `
  <div class="weather-info">
    <div class="weather-icon">${iconSymbol}</div>
    <div>
      <h2>${data.city}</h2>
      <p>温度: ${data.temperature}°C</p>
      <p>天气: ${data.condition}</p>
    </div>
  </div>
`;

  // 移除之前的天气类名
  document.body.classList.remove('sunny', 'cloudy', 'rainy');
  // 添加当前天气对应的类名
  document.body.classList.add(weatherClass);
}

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);