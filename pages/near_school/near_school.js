// pages/near_school/near_school.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['离我最近', '最新加入'],
    currentIndex: 0,
    location: {}, //获取地理位置
    school_list: [], //学校列表
    current_page: 1,//当前页码数
    last_page: 0,
  },
  tabchange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({ currentIndex: index, current_page: 1, last_page: 0, school_list:[]});
    that.init_school();
  },
  business_detail: function (e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/business-detail/business-detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
      fail: function () {
        that.init_school();
      }
    })
  },
  /**
    * 加载附近学校
    */
  init_school: function () {
    console.log("加载附近学校！");
    let that = this;
    //查询附近学校
    console.log(that.data.location);
    let params = that.data.location;
    if (that.data.currentIndex == 1) {
      params['latest'] = 1;
    }
    params['page'] = that.data.current_page;
    app.apiGet(app.apiList.find_school_list, params, this.init_school_callback);
  },
  /**
   * 查询学校结果
   */
  init_school_callback: function (res) {
    let that = this;
    if (res.code) {
      let list = that.data.school_list
      list = list.concat(res.data.data);
      this.setData({
        school_list: list,
        last_page: res.data.last_page+1,
        current_page: that.data.current_page + 1
      });
    }
    console.log(res);
  },
  /**
   * 加载更多学校
   */
  load_more_school:function(){
    this.init_school();
    console.log("加载更多学校！！！");
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