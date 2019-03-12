// pages/business-detail/business-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    school:{},
    currentIndex1:0,
    visit_list:[],
    userinfo:{} //获取用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var openid = wx.getStorageSync(app.config.key + '_openid');
    if (!openid) {
      app.getUserInfo(this.init_userinfo);
    } else {
      this.init_userinfo();
    }

    let id = options.id;
    console.log("id:"+id);
    //查询学校详情
    app.apiGet(app.apiList.find_school,{id:id}, this.init_school_callback);

  },
  /**
   * 初始化用户信息
  */
  init_userinfo: function () {
    let userinfo = wx.getStorageSync('userInfo');
    this.setData({ userinfo: userinfo });
    console.log(userinfo);
  },
  /**
   * 学校详情
   */
  init_school_callback:function(res){

    if(res.code){
      if(res.data.photos){
        res.data.photos = res.data.photos.split(",");
      }else{
        res.data.photos = [];
      }
      wx.setNavigationBarTitle({
        title: res.data.name
      })
      this.setData({school:res.data});
      //更新一次点击量
      this.hits_school();
    }
    console.log(res);
  },
  tabchange:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({currentIndex:index})
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
  join_info: function () {
    wx.navigateTo({
      url: '/pages/join_info/join_info'
    })
  },
  /**
   * 更新一次点击量
   */
  hits_school:function(){
    let id = this.data.school.id;
    let hits = this.data.school.hits + 1;
    app.apiGet(app.apiList.edit_school, { id: id, hits: hits }, this.init_hits_callback);
    this.visit_school();
  },
  /**
   * 增加访客记录
   */
  visit_school:function(){
    let that = this;
    let id = this.data.school.id;
    let userinfo = this.data.userinfo;
    let params = {
      school_id: id,
      openid: wx.getStorageSync(app.config.key + '_openid'),
      nickname: userinfo.nickName,
      avatar: userinfo.avatarUrl
    };
    console.log(params);
    app.apiPost(app.apiList.add_visit, params, that.visit_callback);
  },
  /**
   * 访问记录回调
   */
  visit_callback:function(res){
    console.log(res);
    //查询附近访客
    this.find_visit_list();
  },
  /**
   * 查询附近访客
   */
  find_visit_list:function(){
    let that = this;
    let school_id = that.data.school.id;
    app.apiGet(app.apiList.find_visit_list, { school_id: school_id }, this.find_visit_callback);
  },
  /**
   * 附近访客回调
   */
  find_visit_callback:function(res){

    if(res.code){
      console.log(res);
      this.setData({visit_list:res.data});
    }
  },
  /**
   * 点击回调
   */
  init_hits_callback:function(res){
    let that = this;
    if (res.code) {
      let school = this.data.school;
      school.hits = school.hits + 1;
      this.setData({ school: school });
    }
  },

  /**
   * 学校投票
   */
  vote_school:function(){
    let id = this.data.school.id;
    let vote = this.data.school.votes+1;
    app.apiGet(app.apiList.edit_school, { id: id,votes:vote}, this.init_vote_callback);
  },
  /**
   * 点赞成功回调
   */
  init_vote_callback:function(res){
    console.log(res);
    if(res.code){
      let school = this.data.school;
      school.votes = school.votes + 1;
      this.setData({ school: school });
      app.showToast("感谢您的赞赏！");
    }else{
      app.showToast("点赞失败，请稍后再试！");
    }
  },
  /**
   * 收藏学校
   */
  collect_school:function(){
    let that = this;
    let id = this.data.school.id;
    let vote = this.data.school.votes + 1;
    var openid = wx.getStorageSync(app.config.key + '_openid');
    if (!openid) {
      app.getUserInfo(this.init_userinfo);
      return false;
    } 
    console.log("openid:"+openid);
    app.apiGet(app.apiList.collect_school, { school_id: id,openid:openid}, this.collect_school_callback);
    //app.showToast("收藏成功！");
  },
  /**
   * 收藏学校回调处理
   */
  collect_school_callback:function(res){
    console.log(res);
    if(res.code){
      app.showToast(res.msg,'none');
    }else{
      app.showToast(res.msg, 'none');
    }  
  },
  /**
   * 拨打电话
   */
  make_phone:function(){
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.school.mobile
    })
  },
  /**
   * 定位
   */
  location:function(){
    let that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.school.latitude),
      longitude: parseFloat(that.data.school.longitude),
      name:that.data.school.name
    });
  },
  // 收藏按钮点击隐藏显示
  collection: function (e) {
    var currentIndex1 = this.data.currentIndex1;
    if (currentIndex1 == 0) {
      this.setData({
        currentIndex1: 1
      })
    } else {
      this.setData({
        currentIndex1: 0
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.school.name,
      path: '/pages/business-detail/business-detail?id='+that.data.school.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})