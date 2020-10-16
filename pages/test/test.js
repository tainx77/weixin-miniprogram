
// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: true,
    latitude: "",
    longitude: "",
    scale: 14,
    markers: [{
      id: 0,
      iconPath: "../../static/yl.png",
      latitude: 30.616420,
      longitude: 114.260387,
      width: 30,
      height: 30
    }, {
      id: 1,
      iconPath: "../../static/yl.png",
      latitude: 30.612948,
      longitude: 114.263027,
      width: 30,
      height: 30
    }, {
      id: 2,
      iconPath: "../../static/yl.png",
      latitude: 30.614702,
      longitude: 114.260688,
      width: 30,
      height: 30
    }, {
      id: 3,
      iconPath: "../../static/yl.png",
      latitude: 30.617768,
      longitude: 114.266739,
      width: 30,
      height: 30
    }],
    mapCtx: null,
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    });
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo,
                canIUse: false
              })
            }
          })
        }
      }
    })
  },
  onReady: function () {
    this.data.mapCtx = wx.createMapContext('myMap');
  },
  onClick: function () {
    this.setData({
      scale: 14
    });
    this.data.mapCtx.moveToLocation();
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        canIUse: false
      })
    }
  },
  eventhandle(e){
    this.setData({
      isShow:true
    })
  },
  clickMap(e) {
    if(this.data.isShow){
      this.setData({
        isShow: false
      })
    }
  }


})