var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../image/banner.jpg',
      '../../image/banner.jpg',
      '../../image/banner.jpg'
    ],
    slide_thumbs: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tabs: ['离我最近', '最新加入'],
    currentIndex: 0,
    location: {}, //获取地理位置
    school_list:[] //学校列表
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //初始化幻灯片
    app.apiGet(app.apiList.find_slide, {},this.init_slide);
    
    //获取地址位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({ location: { 'latitude': latitude, 'longitude': longitude } });
        //初始化学校
        that.init_school();
      },
      fail:function(){
        that.init_school();
      }
    })
  },
  /**
   * 初始化幻灯片数据
   */
  init_slide: function (res) {
    console.log(res);
    if (res.code) {
      this.setData({ slide_thumbs: res.data });
    }
  },
  /**
   * 加载附近学校
   */
  init_school:function(){
    console.log("加载附近学校！");
    let that = this;
    //查询附近学校
     console.log(that.data.location);
    let params = that.data.location;
    if (that.data.currentIndex==1){
      params['latest'] = 1;
    }
    app.apiGet(app.apiList.find_school_list,params, this.init_school_callback);
  },
  /**
   * 查询学校结果
   */
  init_school_callback:function(res){
    if(res.code){
      this.setData({ school_list: res.data.data});
    }
    console.log(res);
  },
  tabchange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({ currentIndex: index })
    that.init_school();
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
  business_detail: function (e) {
    let id = e.currentTarget.dataset.id;
    debugger;
    wx.navigateTo({
      url: '/pages/business-detail/business-detail?id='+id
    })
  },
  information: function () {
    wx.navigateTo({
      url: '/pages/information/information'
    })
  },
  join_info: function () {
    wx.navigateTo({
      url: '/pages/join_info/join_info'
    })
  },
  near_school: function () {
    wx.navigateTo({
      url: '/pages/near_school/near_school'
    })
  },
  /**
   * 招生方案
   */
  case_list:function(){
    wx.navigateTo({
      url: '/pages/tool/tool',
    })
  },
  /**
   * 营销工具
   */
  activity_list:function(){
    app.showToast("正在更新中...", 'none');
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