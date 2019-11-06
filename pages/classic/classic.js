import ClassicModel from '../../models/classic.js'
import LikeModel from '../../models/like.js'

// 实例化
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取最新一期期刊
    classicModel.getLatest((res) => {
      this.setData({
        classic: res.data
      })
      // console.log(this.data.classic)
    })
  },

  onLike: function(event) {
    let behavior = event.detail.behavior //获取当前的点赞状态
    console.log(behavior)
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext: function(event) {
    this._updateClassic('next')
  },
  onPrevious: function (event) {
    this._updateClassic('previous')
  },
  // 抽离的私有方法
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this.setData({
        classic: res.data,
        latest: classicModel.isLatest(res.data.index),
        first: classicModel.isFirst(res.data.index)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})