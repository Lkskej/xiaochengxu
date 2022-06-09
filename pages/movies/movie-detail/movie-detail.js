var util = require('../../../utils/util.js')
Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    var movieId = options.id;

    var url = "http://t.talelin.com/v2/movie/subject/" + 305;

    util.http(url, this.processDoubanData);

  },

  processDoubanData(movie) {
    console.log(movie)
    const result = movie;
     result.directors = util.convertToCastString(movie.directors);
     result.castsInfo = util.convertToCastInfos(movie.casts);
    result.casts = util.convertToCastString(movie.casts);
    // ["剧情", "悬疑", "犯罪"] ==> "剧情、悬疑、犯罪"
     result.genres = movie.genres.join("、");
     result.rating.stars = Number(movie.rating.stars) / 10;

    this.setData({
      movie: result
    })
  },
  /*查看图片*/
  onViewPost: function (e) {
    // console.log(e.currentTarget.dataset.src)
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [src] // 需要预览的图片链接列表
    })
  },
})