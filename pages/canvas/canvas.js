Page({
  data: {
    oAwardsConfig:{},//奖品配置
    isChance:false,//
    runDegs:0,//旋转角度
    awardsList: {},
    animationData: {},
    btnDisabled: ''
  },
  getLottery: function () {
    let _This = this
    let awardIndex = Math.random() * 6 >>> 0;
    console.log("awardIndex----------------", Math.random()*6);
    let { oAwardsConfig, runDegs} = _This.data;
    console.log("oAwardsConfig----------------", oAwardsConfig);
    // 获取奖品配置
    let awardsConfig = oAwardsConfig,
        runNum = 8
    console.log("awardIndex----------------", awardIndex,runDegs);
    // 旋转抽奖
    console.log('deg----11111------',runDegs)
    runDegs =runDegs + (360 - runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
    console.log('deg----2222222-------',runDegs)

    let animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    _This.animationRun = animationRun
    animationRun.rotate(runDegs).step();
    _This.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled',
      runDegs: runDegs
    })

    // 中奖提示
    setTimeout(function() {
      wx.showModal({
        title: '恭喜',
        content: '获得' + (awardsConfig.awards[awardIndex].name),
        showCancel: false
      })
      if (awardsConfig.chance) {
        _This.setData({
          btnDisabled: ''
        })  
      }
    }, 4000);
    
  },
  onReady: function (e) {

    let _This = this;

    // getAwardsConfig
    let oAwardsConfig = {
      chance: true,
      awards:[
        { 'index': 0, 'name': '1元红包', 'icon':"https://mk-node-wxa.nihaomc.com/feimg/ind-cus-manage.png"},
        { 'index': 1, 'name': '5元话费', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-search.png"},
        { 'index': 2, 'name': '6元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-case.png"},
        { 'index': 3, 'name': '8元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-dest.png"},
        { 'index': 4, 'name': '10元话费', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-collect.png"},
        { 'index': 5, 'name': '20元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-share.png"}
      ]
    }
    // 绘制转盘
    let awardsConfig = oAwardsConfig.awards,
        len = awardsConfig.length||1,
        rotateDeg = 360 / len / 2 + 90,
        html = [],
        turnNum = 1 / len  // 文字旋转 turn 值
    _This.setData({
      btnDisabled: oAwardsConfig.chance ? '' : 'disabled'  
    })
    let ctx = wx.createContext()
    for (let i = 0; i < len; i++) {
      // 奖项列表
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name, icon: awardsConfig[i].icon});    
    }
    _This.setData({
        awardsList: html,
      oAwardsConfig: oAwardsConfig
      });

  }

})
