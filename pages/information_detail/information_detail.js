// pages/advisoryDetails/advisoryDetails.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:'',
    title:'',
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    console.log(id);
    app.apiGet(app.apiList.find_article, { uid: app.config.uid,id: id }, this.init_article);
  },
  init_article: function (res) {
    console.log(res.data);
   
    var that = this;
    if (res.code) {
      wx.setNavigationBarTitle({
        title: res.data.post_title
      })
      that.setData({ time:res.data.create_time});
      WxParse.wxParse('article', 'html', res.data.post_content, that, 15);
    }
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