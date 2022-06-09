var util = require('../../utils/util.js')
var app = getApp();
Page({
  // RESTFul API JSON
  // SOAP XML
  //粒度 不是 力度
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    //
    containerShow: true,
    //
    searchPanelShow: false,
  },

  //https://api.douban.com/v2/movie/in_theaters?start=0&count=3
  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase+
    "?type=movie&tag=热门&page_limit=10&page_start=0";
    var comingSoonUrl =  app.globalData.doubanBase+"?type=movie&tag=最新&page_limit=10&page_start=0";
    var top250Url =  app.globalData.doubanBase+"?type=movie&tag=豆瓣高分&page_limit=10&page_start=0";
    var top251Url =  app.globalData.doubanBase+"?type=movie&tag=冷门佳片&page_limit=10&page_start=0";
    var top252Url =  app.globalData.doubanBase+"?type=movie&tag=华语&page_limit=10&page_start=0";
    var top253Url =  app.globalData.doubanBase+"?type=movie&tag=欧美&page_limit=10&page_start=0";
    var top254Url =  app.globalData.doubanBase+"?type=movie&tag=韩国&page_limit=10&page_start=0";
    var top255Url =  app.globalData.doubanBase+"?type=movie&tag=日本&page_limit=10&page_start=0";
    util.http(inTheatersUrl, this.processDoubanData,"inTheaters","正在热映");
    util.http(comingSoonUrl, this.processDoubanData,"comingSoon","即将上映");
    util.http(top250Url, this.processDoubanData,"top250","豆瓣Top250");
    util.http(top251Url, this.processDoubanData,"top251","冷门佳片");
    util.http(top252Url, this.processDoubanData,"top252","华语");
    util.http(top253Url, this.processDoubanData,"top253","欧美");
    util.http(top254Url, this.processDoubanData,"top254","韩国");
    util.http(top255Url, this.processDoubanData,"top255","日本");
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;   
      // 你好啊大家好等等
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rate),
        title: title,
        average: subject.rate,
        coverageUrl: subject.cover,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};

    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    //readyData将替换掉 data 中的三个变量 inTheaters、comingSoon、top250
    this.setData(readyData);
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
    })
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      // searchPanelShow: false,
      searchResult: {}
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      // searchPanelShow: true
    })
  },
  //http://t.talelin.com/v2/movie/search?q=刘德华
  onBindBlur: function (event) {
    //event.detail.value获取文本框所输入的数据
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase+"?type=movie&tag=豆瓣高分&page_limit=10&page_start=0";
    console.log(searchUrl)
    this.getMovieListData(searchUrl, "searchResult", "");
  }
})