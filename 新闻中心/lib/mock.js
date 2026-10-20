var mock = new AxiosMockAdapter(axios);

const newsCount = 5
const responseDelay = 1000

let failSource = []

// 生成最近一周的随机时间
function randomDate() {
    const endDate = new Date(); // 当前日期和时间
    const startDate = new Date();

    startDate.setDate(endDate.getDate() - 7); // 一周前的日期

    const time = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return formatDate(time)
}
// 格式化时间
function formatDate(time) {
    const date = new Date(time);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const H = date.getHours();
    const M = date.getMinutes();
    const S = date.getSeconds();
    return `${y}/${padStart(m)}/${padStart(d)} ${padStart(H)}:${padStart(M)}:${padStart(S)}`;
}
function padStart(num) {
    if (num < 10) {
        return '0' + num
    } else {
        return num
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 生成随机内容
function generateRandomSimpleChineseChar(length) {
    var result = '';
    for (var i = 0; i < length; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * (21333 - 19968 + 1)) + 19968);
    }
    return result;
}

// 生成随机姓名
function generateRandomChineseName() {
    var lastName = ['王', '李', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周', '徐', '孙', '马', '朱', '胡', '郭', '何', '高', '林', '罗'];
    var firstName = ['伟', '芳', '娜', '敏', '静', '秀英', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀兰', '霞'];

    var randomLastName = lastName[Math.floor(Math.random() * lastName.length)];
    var randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];

    return randomLastName + randomFirstName;
}

function getRandomNumber(m, n) {
    return Math.floor(Math.random() * (n - m + 1)) + m;
}

// 蓝桥财经新闻
mock.onGet('/news/caijing').reply(function (config) {
    let arr = []
    for (let i = 0; i < newsCount; i++) {
        const obj = {
            title: `数字经济新趋势：虚拟货币交易所推出全新加密货币交易平台${i + 1}`,
            content: generateRandomSimpleChineseChar(getRandomInt(100, 400)),
            createTime: randomDate(),
            author: generateRandomChineseName(),
            source: '蓝桥财经新闻'
        }
        arr.push(obj)
    }
    if (Math.random() > 0.5 && !failSource.includes('caijing')) {
        failSource.push('caijing')
        return [400, { code: 400, msg: '获取失败' }]
    } else {
        const delay = getRandomNumber(0, responseDelay)
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, { code: 200, data: arr }]);
            }, delay);
        });
    }
});

// 蓝桥社会新闻
mock.onGet('/news/shehui').reply(function (config) {
    let arr = []
    for (let i = 0; i < newsCount; i++) {
        const obj = {
            name: `国内十大新闻源联合发布：共筑新闻资讯新生态${i + 1}`,
            content: generateRandomSimpleChineseChar(getRandomInt(100, 400)),
            createTime: randomDate(),
            author: generateRandomChineseName(),
            origin: '蓝桥社会新闻'
        }
        arr.push(obj)
    }
    if (Math.random() > 0.5 && !failSource.includes('shehui')) {
        failSource.push('shehui')
        return [400, { code: 400, msg: '获取失败' }]
    } else {
        const delay = getRandomNumber(0, responseDelay)
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, { code: 200, data: arr }]);
            }, delay);
        });
    }
});

// 蓝桥科技新闻
mock.onGet('/news/keji').reply(function (config) {
    let arr = []
    for (let i = 0; i < newsCount; i++) {
        const obj = {
            title: `科技进步：全新AI助手引领智能生活新趋势${i + 1}`,
            content: generateRandomSimpleChineseChar(getRandomInt(100, 400)),
            date: randomDate(),
            author: generateRandomChineseName(),
            source: '蓝桥科技新闻'
        }
        arr.push(obj)
    }
    if (Math.random() > 0.5 && !failSource.includes('keji')) {
        failSource.push('keji')
        return [400, { code: 400, msg: '获取失败' }]
    } else {
        const delay = getRandomNumber(0, responseDelay)
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, { code: 200, data: arr }]);
            }, delay);
        });
    }
});

// 蓝桥娱乐新闻
mock.onGet('/news/yule').reply(function (config) {
    let arr = []
    for (let i = 0; i < newsCount; i++) {
        const obj = {
            title: `电影界新生代崛起：年轻演员获得奥斯卡提名成为焦点${i + 1}`,
            content: generateRandomSimpleChineseChar(getRandomInt(100, 400)),
            createTime: randomDate(),
            author: generateRandomChineseName(),
            from: '蓝桥娱乐新闻'
        }
        arr.push(obj)
    }
    if (!failSource.includes('yule')) {
        failSource.push('yule')
        return [400, { code: 400, msg: '获取失败' }]
    } else {
        const delay = getRandomNumber(0, responseDelay)
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, { code: 200, data: arr }]);
            }, delay);
        });
    }
});

// 蓝桥教育新闻
mock.onGet('/news/jiaoyu').reply(function (config) {
    let arr = []
    for (let i = 0; i < newsCount; i++) {
        const obj = {
            name: `全球大学排名出炉：哈佛大学连续第五年蝉联世界第一${i + 1}`,
            content: generateRandomSimpleChineseChar(getRandomInt(100, 400)),
            date: randomDate(),
            author: generateRandomChineseName(),
            origin: '蓝桥教育新闻'
        }
        arr.push(obj)
    }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve([200, { code: 200, data: arr }]);
        }, responseDelay - 200);
    });
});


// 蓝桥国际新闻
mock.onGet('/news/guoji').reply(function (config) {
    let arr = []
    for (let i = 0; i < newsCount; i++) {
        const obj = {
            title: `2024巴黎时装周：新兴设计师的大胆创新颠覆传统${i + 1}`,
            content: generateRandomSimpleChineseChar(getRandomInt(100, 400)),
            date: randomDate(),
            author: generateRandomChineseName(),
            from: '蓝桥国际新闻'
        }
        arr.push(obj)
    }
    return [200, { code: 200, data: arr }]
});