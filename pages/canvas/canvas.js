var app = getApp()
Page({
  data: {
    oAwardsConfig:{},//奖品配置
    awardsList: {},
    animationData: {},
    btnDisabled: ''
  },
  gotoList: function() {
    wx.redirectTo({
      url: '../list/list'
    })
  },
  getLottery: function () {
    let _This = this
    let awardIndex = Math.random() * 6 >>> 0;
    let oAwardsConfig = _This.data.oAwardsConfig;
    console.log("oAwardsConfig----------------", oAwardsConfig);
    // 获取奖品配置
    let awardsConfig = oAwardsConfig,
        runNum = 8
    if (awardIndex < 2) awardsConfig.chance = false
      console.log("awardsConfig----------------", awardsConfig);

    // 旋转抽奖
    app.runDegs = app.runDegs || 0
    console.log('deg----11111------', app.runDegs)
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
    console.log('deg----2222222-------', app.runDegs)

    let animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    _This.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    _This.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
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
        { 'index': 5, 'name': '10元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-share.png"}
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
      // 保存当前状态
      ctx.save();
      // 开始一条新路径
      ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      ctx.translate(150, 150);
      // 从(0, 0)坐标开始定义一条新的子路径
      ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      ctx.rotate((360 / len * i - rotateDeg) * Math.PI/180);
      // 绘制圆弧
      ctx.arc(0, 0, 150, 0,  2 * Math.PI / len, false);
      // 颜色间隔
      if (i % 2 == 0) {
          ctx.setFillStyle('rgba(255,184,32,.1)');
      }else{
          ctx.setFillStyle('rgba(255,203,63,.1)');
      }
      // 填充扇形
      ctx.fill();
      // 绘制边框
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('rgba(228,55,14,.1)');
      ctx.stroke();
      // 恢复前一个状态
      ctx.restore();
      // 奖项列表
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name, icon: awardsConfig[i].icon});    
    }
    _This.setData({
        awardsList: html,
      oAwardsConfig: oAwardsConfig
      });

  }

})
