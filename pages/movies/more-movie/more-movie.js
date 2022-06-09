// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({
  data: {
    movies: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
  },
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase+
        "?type=movie&tag=热门&page_limit=20&page_start=0";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase+"?type=movie&tag=最新&page_limit=20&page_start=0";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase+"?type=movie&tag=豆瓣高分&page_limit=20&page_start=0";
        break;
    }
 
    this.data.requestUrl = dataUrl;

    util.http(dataUrl, this.processDoubanData)
  },

  onReachBottom: function (event) {
    console.log(this.requestUrl)

    // https://movie.douban.com/j/search_subjects?type=movie&tag=热门&page_limit=20&page_start=0

    var nextUrl = this.data.requestUrl.substr(0,this.data.requestUrl.length-1)+this.data.totalCount;

    util.http(nextUrl, this.processDoubanData)

    wx.showNavigationBarLoading()
  },

  onPullDownRefresh: function (event) {

    var refreshUrl = this.data.requestUrl;

    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function (moviesDouban) {
    console.log(moviesDouban)
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rate),
        title: title,
        average: subject.rate,
        coverageUrl: subject.cover,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = {}

    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    }
    else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });

    this.data.totalCount += 20;

    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
})