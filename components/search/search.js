import KeywordModel from '../../models/keyword.js'
import BookModel from '../../models/book.js'


const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
  },

  attached: function() {
    const historyWords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords
    })
    hotWords.then(res => {
      this.setData({
        hotWords: res.data.hot
      })
    })
  },

  /**
   * 组件的方法列表
   * 
   */
  methods: {
    onCancel: function(event) {
      this.triggerEvent('cancel', {}, {})
    },
    onDelete(event) {
      this.setData({
        searching: false
      })
    },

    onConfirm: function(event) {
      let q = event.detail.value || event.detail.text
      q = q.trim()
      this.setData({
        searching: true
      })
      bookModel.search(0, q).then(res => {
        this.setData({
          dataArray: res.data.books,
					// 为了使得点击tag组件时也能存储为历史搜索，结合input标签的value属性，动态改变绑定值
          q
        })
        keywordModel.addToHistory(q)

      })

    }
  }
})