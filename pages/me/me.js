// pages/me/me.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var openid = wx.getStorageSync(app.config.key + '_openid');
    if (!openid) {
      app.getUserInfo(this.init_userinfo);
    }else{
      this.init_userinfo();
    } 
  },
  /**
  * 初始化用户信息
 */
  init_userinfo: function () {
    console.log("xxdddd");
    let userinfo = wx.getStorageSync('userInfo');
    console.log(userinfo);
    this.setData({ userinfo: userinfo });
  },
  center: function () {
    wx.redirectTo({
      url: '/pages/me/me'
    })
  },
  home: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  about_us:function() {
    app.showToast("正在更新中...",'none');
    // wx.navigateTo({
    //   url: '/pages/about_us/about_us'
    // })
  },
  join_info: function () {
    wx.navigateTo({
      url: '/pages/join_info/join_info'
    })
  },
  collect: function () {
    wx.navigateTo({
      url: '/pages/collect/collect'
    })
  },
  register: function () {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  log_in: function () {
    wx.navigateTo({
      url: '/pages/log-in/log-in'
    })
  },
  /**
   * 我的活动
   */
  my_activity:function(){
    wx.navigateTo({
      url: '/pages/my_activity/my_activity',
    })
  },
  sign_up:function(){
    wx.navigateTo({
      url: '/pages/sign_up/sign_up',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})