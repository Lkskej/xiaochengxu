var postsData = require('../../../data/posts-data.js')
Page({
    data: {
        collected:false
    },
    onLoad: function (option) {
    
        var postId = option.id;

        this.data.currentPostId = postId;

        var postData = postsData.postList[postId];

        this.setData({
            postData: postData
        })

        //getStorageSync从本地缓存中同步获取指定 key 对应的内容。
        var postsCollected = wx.getStorageSync('posts_collected')

        if (postsCollected) {
            var postCollected =  postsCollected[postId];
            this.setData({
                collected: postCollected
            })
        }
        else {   
            var postsCollected = {};// {0,false}
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.postData.title,
            desc:   this.data.postData.content,
            // title: '离思五首·其四',
            // desc: '曾经沧海难为水，除却巫山不是云',
            path: '/pages/posts/post-detail/post-detail'
        }
    }
    ,
    onShareTap: function (event) {
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到新浪微博"
        ];
        // var that=this
        //wx.showActionSheet(OBJECT)显示操作菜单
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success:  (res) => { //箭头函数

                wx.showModal({
                    title: "用户" + itemList[res.tapIndex],
                    content: this.data.postData.content
                })
            },
        })
    },
    onShareTimeline:function (event) {
        return{
            title: this.data.postData.title,
            imageUrl:this.data.postData.headImgSrc
        }
    },

    onColletionTap: function (event) {
        wx.getStorage({
            key: "posts_collected",
            success:  (res)=> {

                var postsCollected = res.data;

                // {"0":false}
                // {"0":true,"1":true}
      
                var postCollected = postsCollected[this.data.currentPostId];
                // // 收藏变成未收藏，未收藏变成收藏
                postCollected = !postCollected;
                
                postsCollected[this.data.currentPostId] = postCollected;
                
                wx.setStorageSync('posts_collected', postsCollected);
                // 更新数据绑定变量，从而实现切换图片
                this.setData({
                    collected: postCollected
                })
                wx.showToast({
                    title: postCollected ? "收藏成功" : "取消成功",
                    duration: 1000,
                    icon: "success"
                })
            },
            
        }) 

    },

    
})