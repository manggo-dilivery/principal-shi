// pages/join_info/join_info.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}, //用户信息
    school_thumb:'/icon/plus1.png',//学校封面
    school_desthumbs:[], //学校描述封面图
    location:{} //获取地理位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that= this;
    var openid = wx.getStorageSync(app.config.key + '_openid');
    if (!openid) {
      app.getUserInfo(this.init_userinfo);
    } else {
      this.init_userinfo();
    }
    //获取地址位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({ location: { 'latitude': latitude, 'longitude': longitude}});
        // var speed = res.speed
        // var accuracy = res.accuracy
      }
    })
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
   * 表单提交处理
   */
  formSubmit:function(e){
    // app.showToast("入驻信息提醒！");
    if (!e.detail.value.name) {
      app.showToast('学校名称不能为空！', 'none'); return false;
    }
    if (!e.detail.value.mobile) {
      app.showToast('手机号不能为空！', 'none'); return false;
    }
    if (e.detail.value.mobile.length != 11) {
      app.showToast('请输入11位手机号！', 'none'); return false;
    }
    var openid = wx.getStorageSync(app.config.key + '_openid');
    // e.detail.value.uid = app.config.uid;
    e.detail.value.subject = this.data.course_id;
    e.detail.value.openid = openid;
    e.detail.value.avatar = this.data.userinfo.avatarUrl;
    e.detail.value.banner = this.data.school_thumb;
    if (this.data.school_desthumbs.length>0){
      e.detail.value.photos = this.data.school_desthumbs.join(",");
    }
    e.detail.value.latitude = this.data.location.latitude;
    e.detail.value.longitude = this.data.location.longitude;
    app.apiPost(app.apiList.add_school, e.detail.value, this.addschool_result);
    console.log(e);
  },
  /**
   * 学校入驻信息回调处理
   */
  addschool_result:function(res){
    if(res.code){
      app.showToast(res.msg);
    }else{
      app.showToast(res.msg,'none');
    }
    //app.alert("学校入驻信息！！");
  },
  /**
   * 上传封面图处理
   */
  upload_banner:function(){
    let that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.config.host + app.apiList.upload_asset,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res1) {
            console.log(res1);
            var res1 = JSON.parse(res1.data)
            if(res1.code){
                //debugger;
              that.setData({ school_thumb: res1.data.preview_url});
            }
            //do something
          }
        })
      }
    })
  },
  /**
   * 上传学校封面图
   */
  upload_school_photo:function(e){
    let that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.config.host + app.apiList.upload_asset,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res1) {
            debugger;
            console.log(res1);
            debugger;
            var res1 = JSON.parse(res1.data)
            if (res1.code) {
              let school_des_thumbs = that.data.school_desthumbs;
              school_des_thumbs = school_des_thumbs.concat(res1.data.preview_url);
              that.setData({ school_desthumbs:school_des_thumbs});

            }
            //do something
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})