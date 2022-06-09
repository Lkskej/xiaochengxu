Page({

  /**
   * 页面的初始数据
   */
  data: {
    person: {
      wxname: '人民冠军',
      tel: 13709829729
    }
  },

  onLoad: function () {


    this.setData({
      city: getApp().appData.city,
      name: getApp().appData.name
    })
  },

  onTap: function (event) {

    // wx.navigateTo({
    //   url: "../posts/posts"
    // });


    // wx.redirectTo({
    //   url: "../posts/posts"
    // });

    wx.switchTab({
      url: "../posts/posts"
    });

  },
  onTextTap: function (event) {
    console.log("onTextTap");
  },



})