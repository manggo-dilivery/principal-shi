// pages/collect/collect.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    userinfo:{},
    collect_id: 0 //收藏表id
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
      this.find_my_collect();
    } 
   
  },
  /**
   * 初始化用户信息
  */
  init_userinfo: function () {
    let userinfo = wx.getStorageSync('userInfo');
    this.setData({ userinfo: userinfo });
    //查询我的收藏
    this.find_my_collect();
  },
  /**
   * 查询我的收藏
   */
  find_my_collect:function(){
    var openid = wx.getStorageSync(app.config.key + '_openid');
    console.log(openid);
    app.apiGet(app.apiList.find_my_collect, { openid: openid }, this.init_collect_callback);
  },
  /**
   * 收藏列表
   */
  init_collect_callback:function(res){
    console.log(res);
    if(res.code){
      this.setData({list:res.data});
    }
  },
  /**
   * 确认取消收藏
   */
  confirm_cancle_collect:function(e){
    debugger;
    this.setData({
      collect_id: e.currentTarget.dataset.id
    });
    console.log(e.currentTarget.dataset.id);
    app.confirm("取消收藏！", this.cancle_collect);
  },
  /**
   * 取消收藏
   */
  cancle_collect:function(res){
    let that = this;
    if(res.confirm){
      // console.log("course_id:" + that.data.collect_id);
      // app.showToast(":"+that.data.collect_id);
      app.apiGet(app.apiList.delete_my_collect, { collect_id: that.data.collect_id }, that.cancle_collect_callback);
    }
    
  },
  /**
   * 取消收藏成功回调
   */
  cancle_collect_callback:function(res){
    app.showToast(res.msg,'none');
    if(res.code){
      this.find_my_collect();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})