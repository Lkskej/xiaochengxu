// pages/posts/posts.js
//只能使用相对路径 不能使用绝对路径
var postsData = require('../../data/posts-data.js')

Page({
  data: {

  },

  onLoad: function () {

    // this.data.postList = postsData.postList
    // 等价于将数据添加到 data:{} 中
    this.setData({
      postList: postsData.postList
    });
  },

  onPullDownRefresh() {
    console.log('触发了下拉刷新')
    setTimeout(() => {
      this.postList = postsData.postList
      wx.stopPullDownRefresh()
    }, 2000)
  },

  onReachBottom() {
    console.log('页面触底了'),
    this.setData({
      postList: [...this.data.postList, ...this.data.postList]
    });
  }
  ,

  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;

    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  onSwiperTap: function (event) {
  
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  }


})