const { createApp, ref, watch, computed, reactive } = Vue // 新增 watch 引入

const app = createApp({
  setup() {
    const lang = getUrlParams(location.href)?.lang ?? 'zh_CN' /* TODO: 需要实现从 URL 中获取 lang 的值 */
    const theme = ref(getUrlParams(location.href)?.theme ?? 'light') /* TODO: 需要实现从 URL 中获取 theme 的值 */
    const { t } = createI18nInstance(lang)

    const nationalContest = ref(t('nationalContest'))

    const currentContest = ref(t('currentContest'))

    let menuList = reactive(
      [
        {
          icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAAD09P/////19/r09/r09/v09/rz9/r09/r19/r19vrz9/n0+Pv0+fn0+fn09/preYaZpK2Un6mMmKJygIzP1dqRnKeXoapufIikr7jIz9a7wsnDytB2g4/W3eHGzNPr7/GJlKCFkZzu8fSzu8OwuMB6h5Ottb7k6O1/jJh1go9wforb4OWosbrn6+/g5OnM0tidprDe4ui+xc2lmZDZAAAAD3RSTlMAGAb08uPZx7+WlYJHLi0oJugQAAACSklEQVRo3uzQWwpCMRRD0fScvlvN/GcrilQu/jZwP7omsEnwY7PX7NzAc+3T8C+0yK1iC7iy4dzOh11mFEqUgOWRKJKea0eiTPpusUKhYngblBqfs5xSHgA0ijXAIsWiYVJuolOuo1KuIlMuwynnIPVO5ESWE7lh5MUuHeQmDANRGD7CvJDYcRJCnbQqhjYp0PvfrR7HpmJnDURiwb/ySJa/hcc2o4EgMzY2F1E9xPUqD7FsyBWbhUwAKr0RpCsAUxYyeMORKOeVIQsxQE3CasBkIQAKKVIAeCEv5EkQldrRHA8zcU5dI7r8X5MgSJW0RWzglzqkPokapLQMGXVozwgfRoPKMWL00pmRYxz2MuSNYlsY4n6OmBjpKcZISbEHIXSGXh8psHk0MrWh+YqcDMMdqnbJMXKIgxUhqdYjGH09qo+b7fplJCVc4aEO7TwSO6iAmHpJhe2Kw+X+P/n2nUoYu/rHv3+hWx2hv3btXgdBGAAC8OLeS5G/YBpJpQ10wMT3fzclMSxSU6FeMPYG1m+BkPYuQ834TsrvIx36CZmjHsiccyREAbkf2ev/JCEJ+VHEAXItIgEnQg9B4zpjDD4EWQCuzVakdQBsEKINNsToIEQos8FQIgwR2mbDcSkVUD2fSxkyq4UHCU8NXITo3r3jCUnIp0hTyikG6KXsASOnlE1M5ApP8ojIzYecIiK6qJaIqtDiNXu66EzIHyCE4uxAqQApZSallqUUzJSqnFH6U+YLjCEGZVLCGMcwZj6MwRJjekUckVHmcHfWmFSLfdqL3QAAAABJRU5ErkJggg==`,
          titleKey: `menuList.starter`,
          courseNum: "176+",
          descriptionKey: 'menuList.course',
        },
        {
          icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAn1BMVEUAAAD09P/////19/r09/r09/v09/rz9/r09/r19/r19vrz9/n0+Pv0+fn0+fn09/preYaUn6mZpK2MmKJygIxufInx9Pemr7mwuMDu8fTO1NmIk57k6e3h5eqCj5p/jJd8iJR4hZF1g49zgI7r7/Le4ufT2N7Jz9a7wsqyusKrtL2irLTa3+TW3OHo7PC4wMeRnKfQ1tvDytG+xc2dprDbfQP/AAAAD3RSTlMAGAb08uPZx7+WlYJHLi0oJugQAAACnUlEQVRo3u2afZOaMBCHOfF8b/fHaVAUFBXR+nae1+//2UqAElu0QyFJezc8fzjCODxkFxZi1hA0Br1OyyQJmK1Ob9Aw8jx1mySVZvfpN0Wjb5J0zH7jl2G0SQntm8F8eSZFPH/NxiEc8i3pWBptUkg7yUuflNKPg2WSUkwesC4pphtlpEmKaTaMASlnYPRIOT2jQ8rpGC1STsswSTmmQRqoJbUk4xNJgvGMoQRsNg6KSsIlSrMMi0mCyFHBEhSSjAGMLlYJLiMA40KSGbB2qRTuGpgVkjDAopJYACskAfBCJXkBUEv+hcQ7q5ccwKZqJOHU/jkOJNf4eetKluzEzklyWztzsFCqJGQAS4eyAPBGNOWFypUocVcAhhSzAbCKfOc132dLk9hD8HomonWgiC0i9tIke0RsKWHOo5WVa0wlSabIKriIVoQ949/dqhKRkLlNt9FK8ERaykvE+Y48SpmLEIm0VJGIYF0pF60sLcypLjkiYkf5aHEsfrPIyMmBn+3pXrToVZxARYnDb3E/yKK1zqJ1YuK3FSV05Mey8tEKfAALR46Edoh4zUWLJ4QdpdWul/RwXhotkZB3kiERaZknx/1OCS4TG1IkdExK/fCmhoUiIZIkdGXYxylZ2qI0LzaSH79nj1+z/uhN1JuNrehFwv5c710fRaJl6jCLn1Gl8EZFJ0H7eB47LEE8Z94Xkjg+KuA7hSR08is4TlRMQs5kuBrdg1ew9PMeq+HEoQeS4oyBb0STP13jtaSW/K1kZ8X4wMKyFsAy2d7JlGzxgKlEyTsecJUocS4Md2AXh/L8T3901pJa8oEkJimnqWUJUMtippZlWS0LzFqWynUs+mtpX9DRiKGlpURHc4yONh8dDUs6Wq80NpFpaYf7AWIkUjpvj2HYAAAAAElFTkSuQmCC`,
          titleKey: `menuList.project`,
          courseNum: "6",
          descriptionKey: 'menuList.business',
        },
        {
          icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAq1BMVEUAAAD19/r09P/////19/r09/r09/v09/rz9/r09/rz9/n0+Pv0+fn0+fn09/preYajrLXu8fWMmKLj6Ox4hZF7iJNzgY5xfotte4jy9fmeqLGJlKB9ipbp7fDg5Onb4OXY3uPm6u/GzNPr7/LV2+DK0NePm6W2vsWwuMCFkZyAjZjByM+ttb7d4ufS1926wcmkrraXoavN09m9xcymsLiCj5q+xs2psruyu8Kb8G0sAAAADnRSTlMAlhgG9PLj2ce/gkcuLYxFwYgAAAOqSURBVGje1dppk6IwEAZgXXEO3e2oIIJyKYrifc/8/1+20xk16BqobQi1+36xKpQ+JpAWTCoitWb1/VWDAqK9vlebtcqf+VGtQ6GpV388ELWGBoVHa9TuuvEGSvKW6MzPF1CUl1+3fqgyULn0pfYGCvNW40gDlKbBB0sDpdFwwKqgONWvM1IHxanXKk1Qnqb60cLxegflea+8gvK8VjRQHq0CJeRfRYbn3dy0jPg4sQGjANFbFrvGOdugAln0WDJRqADZsoc4buFIi2Hi6Vj3R/3vYevYBCTTMEfwHS/mypKAZBldD64JB9jQGxKQDEMHkaGBTR/ZCNnALLBtno3kMcDmXdEzEbqB6WPzOhPJZcAnti8ykVwGbPDAKBPJZcAy33C5h9Zutz27qQbwmeISEReLBsbq6ymGj4cGQEMCg91iyQ07wmNTGhIk6/lzQ1zARpuEuF1exDe+N9kJQ1aTz0BC+BdstQEzMfmXlRt9ICHeXQH3UJlJjY5NQ2Z4xYj3TnG8pEYbaAhe++NEPccP86UGETEYMyGRHlYOmUFFLMZOkMicMXbINvL3ZJFt5D8nQaaR/+oy7QzDdu3c82Sbauz7BmOWcwyoM/6ARm+YYgQDds1u+Ne1q3U4H2OGOaQYo2QxNQJyFf5IMSaMJ44c/mp6WYiI300Y0xRjxb9Of4jv4cM2b2chIuHWuhDxOMWACM/YCHjsGR7dZCMi+jQ6OZ3t2k4z1tePFVe7IUfkkRjicSV6mMeBBKEacPpq2T/cG28kCNUAnEQhiKye/8BViIaonckmT4rQDZjfaqmYNQsJQjUgeriTwJsbT4JQDeAzY3LXkRNIEKoBuoUzw78a/IeahswuhtS3liGCvHhHQEJGKcb4WkmdjsFf5y4JCQ25EZjsPgMdSMhS/ueGz42ddSXMqQ0kxDakz1IrfmgBq4/Y/BKiTQhAQ8bSxxwPDWsEPG0+nFRkI3vM0YUhQkSWiOyfGF00JlAIckRkDI8ZOviTiHgRyOfTB3V3jsYaCkIWiBwfjZMwikD0J8+eYYyTYgyFITBHZXZnDNAIoEDkgIiVOMXtgai8RSE270pvchu/GI0VFIpghcL0V5xY9sT/kHREXs+7ncsNr6ND4Qj4DkvmNAQFCLh9QVitEBQgGH9rcMI5rgCjAsHowT54PlD/7SINAdFAeeqlLAGWsphZyrJsKQvMpSyVl7HoX8r2hTI2YpSypaSMzTFlbPMpY8NSGVuvStxEVsp2uN+ZkjeA5mEtPQAAAABJRU5ErkJggg==`,
          titleKey: `menuList.route`,
          courseNum: "681+",
          descriptionKey: 'menuList.course',
        },
        {
          icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAD09P/////19/r09/r09/v09/rz9/r09/r19/r19vrz9/n0+Pv0+fn09/preYaUn6mMmKKZpK1ygIxufIh7h5Oyu8KwuMDt8PPk6O2RnKd3hJDW3ODO1Nm+xc1/i5fw8/elr7ihq7SKlaCHkp1wforq7vGZo63g5OnJ0Nbm6+/a3+TByc+6wcmrs7ynsLri5uuutr+DkJpTwb3/AAAADnRSTlMAGAb08uPZx7+WlYJHLbIzr4kAAAKJSURBVGje7dpbc6IwGMZxKrYe+zygiSKgoBzq2bbf/8NtpLXb3W1nWCTZbYf/RS68+U3IjKPktX7WGva7dzZqyL7r9oct689uem3UWrt38xvRGtioPXvQ+mUbHWip824z97fQ1O392z60GUp53UurA411Xs5lAK0NiodlQ2v2+YH1oLmeOpE2NNduWUNob2j1ob2+1YX2utYdtHdn2dCebcFADdIgb30jJD+lghUS6Skvi4QBKxeE5ZBcGVcoeSnkRHLsOxXyxyRPpZBUGTNUaqaUtBQiSAcVc0hRCiE5qoqMSDbId0LCw06t20eEizV2nh5kygkwp4sVF7EMcn0InjlXyIQraEQ2aYHIrQ7kwY8Y+QvHdd2AkVqnGpCA544BL400ILsw5SqcrcMoS+hytd5ePq8RQS7oA+uUe3UmIy49FEnWiRxILjcZj1CI51Ku60fiiAw4jRaYHf054pWP+pEJfT7JfQw8c1OowEwV8LzWgzxmyZST3VQIQYqiEHxrWwsy50YhOEhJSimFWnZwVYLnNa8FgQuFFJoPbLNxDA1nkr8gccRk7zlcQgeCy04eBAUDTyvibXyqkg1eSmTtyPxZkNlpn5LRo66v+q0YOwvv/NRSHzoQxABmuOR93R8SDfJPkey6vw5ZKSQhx+tqxnpMJqWQI8kscSuUZCSPpRBP8oqkVwpBKK8wQpRD4D25wfijBCle148K3Cfv+tceS3ICTMkHfFaDNMjfIgenSJKR40SkdIoOdSIbftK8RmTBT9rXiHi+4AcJP8a7/sMXnQ3SIF8IsaG9tpErQCOXmUauZY1cMBu5Kjdx6W9kfMHEIIaRkRITwzEmxnxMDCyZGL0yOERmZBzuBzhqL6w7jCw5AAAAAElFTkSuQmCC`,
          titleKey: `menuList.training`,
          courseNum: "13+",
          descriptionKey: "menuList.course",
        },
        {
          icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAeFBMVEUAAAD19/r09P/////19/r09/r09/v09/rz9/r09/rz9/n0+Pv0+fn09/preYbHzdTN09i6wch+i5aKlKDEy9KBjpmpsrzu8vWwuMChq7TY3eJ4hZFxf4vu8fXj6OzJz9ekrraSnaeNmKO+xsyWoap6iJPJ0NaJlJ/rDeZrAAAADXRSTlMAlhgG9PLj2ce/gkctAN5a7wAAAYZJREFUaN7t2ttygjAQgOHEBDm5ESyHAp4P7fu/YUenbazIADG7U5381858E4Sb7DKdiHnoS7CQ9EMeC9Zuwj2wmscnN4SIJFhPRuLPMQJAKbg6zGwKSE1nv+fQhn3l+ywiAMQCcUEiQC26PCwJqMnzA+OAHGdMeICcJ1gM6MWMA3qchYBeyHxAz2cS0JMMCHKINaQscjWsZWWKlJroLzNECjWid0Mkp0DUue0m6e30IFLBgPIHkQMFcqRA1C7tr/n5XWKAjK+gQJYUiDJCmsXgGmNkDoObO8QhDnkRpMzS+x3W9pCd6mq5toWsVHepLQRO3UhiDamPb/fbp0/2djlkFFLvF9d9fmAgTfsT1KF9jDXCSaobY4/yx9fZdcnzvl0OcYhDHOKQ10Wy4UhmjFTDkUojdq8HdZutMkJyNboc78pWV6BdPuvyFdY1uiaK8r8OBBzSRiSg55GMAEmGmSRjWZIBM8monGLoT7K+QLGIQbJSQrEcQ7HmQ7GwRLF6RbhERrIO9wUz4PxFyEs/7wAAAABJRU5ErkJggg==`,
          titleKey: `menuList.book`,
          courseNum: "",
          descriptionKey: "menuList.algorithmMaterial",
        }
      ].map(item => {
        return {
          ...item,
          showTitle: t(item.titleKey),
          showDescription: t(item.descriptionKey, {
            num: item.courseNum
          })
        }
      })
    )

    let cardList = reactive([
      {
        showTitle: '算法双周赛',
        showDescription: '综合测评个人能力',
        background: `./img/contest-card-bg1.png`,
        titleKey: 'algoContest',
        descriptionKey: 'algoContestDesc'
      },
      {
        showTitle: '编程实战赛',
        showDescription: '模拟实际工作场景',
        background: `./img/contest-card-bg2.png`,
        titleKey: 'programmingReal',
        descriptionKey: 'programmingRealDesc'
      },
      {
        showTitle: '百楼挑战赛',
        showDescription: '30天，用代码丈量你的成长',
        background: `./img/contest-card-bg3.png`,
        titleKey: 'hundredChallenge',
        descriptionKey: 'hundredChallengeDesc'
      },
      {
        showTitle: '蓝桥杯备赛专区',
        showDescription: '充电备考，6月夺冠',
        background: `./img/contest-card-bg4.png`,
        titleKey: 'lanqiaoPrepare',
        descriptionKey: 'lanqiaoPrepareDesc'
      },
    ].map(item => {
      return {
        ...item,
        showTitle: t(item.titleKey),
        showDescription: t(item.descriptionKey)
      }
    })
    )

    let navList = reactive([
      {
        titleKey: 'nav.study',
        isActive: true
      },
      {
        titleKey: 'nav.lanqiao',
        isActive: false
      },
      {
        titleKey: 'nav.work',
        isActive: false
      },
      {
        titleKey: 'nav.cert',
        isActive: false
      },
      {
        titleKey: 'nav.discuss',
        isActive: false
      },
      {
        titleKey: 'nav.schoolAndCompany',
        isActive: false
      },
    ].map(item => {
      return {
        ...item,
        showTitle: t(item.titleKey)
      }
    })
    )

    const handleUrlChange = () => {
      const lang = getUrlParams(location.href)?.lang ?? 'zh_CN' 
      theme.value = getUrlParams(location.href)?.theme ?? 'light'
      const { t } = createI18nInstance(lang)
      
      nationalContest.value = t('nationalContest')

      currentContest.value = t('currentContest')

      const newMenuList = menuList.map(item => {
        return {
          ...item,
          showTitle: t(item.titleKey),
          showDescription: t(item.descriptionKey, {
            num: item.courseNum
          })
        }
      })

      while (menuList.length) {
        menuList.pop();
      }

      menuList.push(...newMenuList)

      const newCardList = cardList.map(item => {
        return {
          ...item,
          showTitle: t(item.titleKey),
          showDescription: t(item.descriptionKey)
        }
      })

      while (cardList.length) {
        cardList.pop();
      }

      cardList.push(...newCardList)

      const newNavList = navList.map(item => {
        return {
          ...item,
          showTitle: t(item.titleKey)
        }
      })

      while (navList.length) {
        navList.pop();
      }

      navList.push(...newNavList)

    }
    return {
      menuList,
      cardList,
      nationalContest,
      currentContest,
      navList,
      theme,
      handleUrlChange
    }
  }
});

app.component('nav-bar', NavBar);
app.component('lq-menu', Menu);
app.component('card-group', CardGroup);

app.mount("#app")