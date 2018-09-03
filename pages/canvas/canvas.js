Page({
  data: {
    aAwardsList: [{'index': 0, 'name': '1元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-cus-manage.png" },
      { 'index': 1, 'name': '5元话费', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-search.png" },
      { 'index': 2, 'name': '6元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-case.png" },
      { 'index': 3, 'name': '8元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-dest.png" },
      { 'index': 4, 'name': '10元话费', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-collect.png" },
      { 'index': 5, 'name': '20元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-share.png" }],//奖品列表
    isChance:false,//
    runDegs:0,//旋转角度
    awardsList: {},
    animationData: {},
    btnDisabled: '',//按钮是否可用
  },
  getLottery: function () {
    let _This = this
    let awardIndex = Math.random() * 6 >>> 0;
    let { runDegs, aAwardsList, isChance} = _This.data;
    // 获取奖品配置
      let  runNum = 8
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
        content: '获得' + (aAwardsList[awardIndex].name),
        showCancel: false
      })
        _This.setData({
          btnDisabled: ''
        }) 
    }, 4000);
    
  },
  onReady: function (e) {

    let _This = this;

    let aAwardsList = _This.data.aAwardsList;
    // 绘制转盘
     let len = aAwardsList.length||1,
       awardsList = [],
        turnNum = 1 / len  // 文字旋转 turn 值
    for (let i = 0; i < len; i++) {
      // 奖项列表
      awardsList.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: aAwardsList[i].name, icon: aAwardsList[i].icon});    
    }
    console.log("awardsList-------------------", awardsList);
    _This.setData({
      awardsList: awardsList
      });

  }

})
