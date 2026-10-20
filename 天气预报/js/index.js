// 天气数据缓存
class WeatherCache {
    constructor() {
        this.cache = new Map();
    }

    // 获取缓存中的数据
    get(city) {
        return this.cache.get(city);
    }

// TODO 目标1 待补充代码
set(city, data) {
    this.cache.set(city, data)
    this.cache.size >= 5 && this.cache.delete(this.cache.keys().next().value)
}
// TODO END

    // 判断缓存中是否存在数据
    has(city) {
        return this.cache.has(city);
    }
}

//检测需要，请勿删除
module.exports = WeatherCache;
