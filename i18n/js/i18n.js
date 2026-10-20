const createI18nInstance = (lang = "zh_CN") => {
  const langJson = eval(lang);
  const t = (langKey, option = {}) => {
    // TODO：待补充代码 目标 1

    with (option) {
      const str = langJson[langKey]
        ? langJson[langKey]
        : eval(`langJson.${langKey}`);

      // return str.replace(/\$\$(\w+)\$\$(\S+)/, (a, v1, v2) =>
      //   v1 ? eval(v1) + v2 : a
      // );

      return str.replace(/\$\$(\w+)\$\$/g, (a, v1) => {
        return v1 ? eval(v1) : a;
      })

    }
    // TODO：END
  };

  return {
    t,
  };
};

window.createI18nInstance = createI18nInstance;

// 目标 1 测试用例 zh_CN 对应

let { t } = createI18nInstance("zh_CN");

console.log(t("lanqiaoPrepare")); // 蓝桥杯备赛专区
console.log(t("nav.work")); //  就业
console.log(t("menuList.route")); // 学习路径
console.log(t("menuList.business", { num: 100 })); // 100大行业

// 目标 1 测试用例 en_US 对应
let { t: t2 } = createI18nInstance("en_US");

console.log(t2("lanqiaoPrepare")); // LanQiao Cup prep area
console.log(t2("nav.work")); //  Jobs
console.log(t2("menuList.route")); // Learning path
console.log(t2("menuList.business", { num: 100 })); // 100 business(es)

// 目标 1 测试用例 ja_JP 对应

let { t: t3 } = createI18nInstance("ja_JP");

console.log(t3("lanqiaoPrepare")); // ブルーブリッジ杯特設コーナー
console.log(t3("nav.work")); //  就職
console.log(t3("menuList.route")); // 学習経路
console.log(t3("menuList.business", { num: 100 })); // 100つの業界
