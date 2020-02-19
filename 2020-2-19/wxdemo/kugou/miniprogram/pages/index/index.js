// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://m.kugou.com/plist/index',
      data: {
        json: 'true',
      },
      success :(res) => {
        console.log(res.data.plist.list.info);
        let data = res.data.plist.list.info;
        data.forEach(item=>{
          if(item.imgurl){
            // console.log(typeof item.imgurl)
            item.imgurl = item.imgurl.replace(/\{size\}/,'200');
          }
        })

        this.setData({info:res.data.plist.list.info})
        

      }
    })
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