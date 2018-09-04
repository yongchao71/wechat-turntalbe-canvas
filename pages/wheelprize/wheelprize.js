Page({
  data: {
    aAwardsList: [{'index': 0, 'name': '1元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-cus-manage.png" },
      { 'index': 1, 'name': '5元话费', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-search.png" },
      { 'index': 2, 'name': '6元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-case.png" },
      { 'index': 3, 'name': '8元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-dest.png" },
      { 'index': 4, 'name': '10元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-share.png" },
      { 'index': 5, 'name': '20元话费', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-collect.png" },
      { 'index': 6, 'name': '50元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-share.png" },
      { 'index': 7, 'name': '100元红包', 'icon': "https://mk-node-wxa.nihaomc.com/feimg/ind-dest.png" },
 
      ],//奖品列表
    isChance:false,//
    rotateDegs:0,//旋转角度
    aAwardsItems: [],//列表显示
    animationData: {},
    isDisabled: '',//按钮是否可用
  },
  fLuckdraw: function () {
    let _This = this;
    let {rotateDegs, aAwardsList, isChance} = _This.data;
    let iAwardsLength=aAwardsList.length||1;
    let iAwardIndex = Math.random()*iAwardsLength>>>0;
    let runNum = 8;
    console.log("iAwardIndex----------------", iAwardIndex,rotateDegs);
    console.log('deg----11111------',rotateDegs);
    rotateDegs=rotateDegs+(360-rotateDegs%360)+(360*runNum-iAwardIndex*(360/iAwardsLength));
    console.log('deg----2222222-------',rotateDegs);
    let oLuckWheel = wx.createAnimation({
      duration: 4000,
      timingFunction:'ease'
    });
    _This.oLuckWheel = oLuckWheel;
    oLuckWheel.rotate(rotateDegs).step();
    _This.setData({
      animationData: oLuckWheel.export(),
      isDisabled: 'disabled',
      rotateDegs: rotateDegs
    });
    // 中奖提示
    setTimeout(function() {
      wx.showModal({
        title: '恭喜',
        content: '获得'+(aAwardsList[iAwardIndex].name),
        showCancel: false
      })
        _This.setData({
          isDisabled: ''
        }) 
    }, 4000);
    
  },
  onReady: function (e) {
    let _This = this;
    let aAwardsList = _This.data.aAwardsList;
    let iAwardsLength = aAwardsList.length||1,
       aAwardsItems = [],
      turnNum = 1 / iAwardsLength; 
    let rotateDeg = 360 / iAwardsLength / 2 + 90;
    let ctx = wx.createContext();
    for (let i = 0; i < iAwardsLength; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(150, 150);
      ctx.moveTo(0, 0);
      ctx.rotate((360 / iAwardsLength * i - rotateDeg) * Math.PI / 180);
      ctx.arc(0, 0, 150, 0, 2 * Math.PI / iAwardsLength, false);
      if (i % 2 == 0) {
        ctx.setFillStyle('#ffb820');
      } else {
        ctx.setFillStyle('#ffcb3f');
      }
      ctx.fill();
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('#e4370e');
      ctx.stroke();
      ctx.restore();
      aAwardsItems.push({ turn: i*turnNum + 'turn', lineTurn:i*turnNum+turnNum/2 + 'turn',award:aAwardsList[i].name, icon: aAwardsList[i].icon});    
    }
    console.log("aAwardsItems-------------------", aAwardsItems);
    _This.setData({
      aAwardsItems: aAwardsItems
      });
    wx.drawCanvas({
      canvasId: 'lotteryCanvas',
      actions: ctx.getActions()
    })
  }

})
