// pages/information/information.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[] //新闻列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.init_list();
  },
  /**
   * 加载新闻
   */
  init_list:function(){
    app.apiGet(app.apiList.find_article_list, { uid: app.config.uid }, this.init_list_callback);
  },
  /**
   * 新闻列表回调
   */
  init_list_callback:function(res){
    console.log(res);
    if(res.code){
      this.setData({list:res.data.data});
    }
  },
  /**
   * 跳转到文章详情
   */
  information_detail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/information_detail/information_detail?id=' + id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})