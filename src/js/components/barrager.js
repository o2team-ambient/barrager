import { Tween } from './utils'

class BarragerCanvas {
  constructor(canvas, opts) {
    this.opts = opts
    this.itemData = []
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.moveFn = {
      linear: Tween.Linear,
      easeIn: Tween.Quad.easeIn,
      easeInOut: Tween.Quad.easeInOut,
      easeOut: Tween.Quad.easeOut
    }
    // 总弹幕数
    this.itemNum = 0
    // 当前显示的弹幕数
    this.hasNum = 0

    this.randomKey = 0

    this.bindEvent()
  }

  bindEvent () {
    window.addEventListener('resize', () => {
      this.resetBarrager()
    })
  }

  init () {
    let { showNum, direction, width } = this.opts
    let realWidth = document.documentElement.clientWidth
    let canvasWidth = width
    if (realWidth < width) {
      canvasWidth = realWidth
    }
    let canvasHeight = canvasWidth / 2
    this.canvas.style.width = `${canvasWidth}px`
    this.canvas.style.height = `${canvasHeight}px`
    this.width = this.canvas.width = canvasWidth
    this.height = this.canvas.height = canvasHeight
    this.allDistance = direction === 'horizontal' ? this.width : this.height

    // 定时随机生成弹幕
    const timeFn = (timeGap) => {
      this.timer = setTimeout(() => {
        this.updateBarrager()
        showNum > this.hasNum && timeFn(Math.floor(Math.random() * 500))
      }, timeGap)
    }

    this.updateBarrager()
    timeFn(Math.floor(Math.random() * 500))

    requestAnimationFrame(this.draw.bind(this))
  }

  updateBarrager(removeItem) {
    const { allNum, showNum } = this.opts
    let newItemData

    // 是否有要移除的Item
    if (removeItem) {
      newItemData = this.itemData.filter(nItem => nItem.key !== removeItem.key)
      this.hasNum--
    } else {
      newItemData = this.itemData
    }
    // 表示所有弹幕显示完毕或者 当前显示的弹幕数超过了限制值
    if (allNum > this.itemNum && showNum > this.hasNum) {
      newItemData.push(this.generateItem())
    }

    this.itemData = newItemData
  }

  generateItem() {
    const { opacity, speed, direction, easeType, contents } = this.opts
    const key = this.getRandomKey()
    const baseLong = 8
    const randomIdx = Math.floor(Math.random() * contents.length)
    const content = contents[randomIdx]
    const realSpeed = Math.sqrt(content.length) / Math.sqrt(baseLong) * speed
    const offset = content.length / baseLong * 150
    const props = {
      startTime: null,
      x: direction === 'vertical' ? Math.floor((Math.random()) * this.width) : 0,
      y: direction === 'horizontal' ? Math.floor((Math.random()) * this.height * 0.7) : 0,
      key,
      opacity,
      speed,
      direction,
      easeType,
      allDistance: this.allDistance + offset * 2,
      allTime: this.allDistance / realSpeed * 1000,
      content,
      offset,
      destroy: this.updateBarrager.bind(this)
    }

    this.itemNum++
    this.hasNum++
    return props
  }

  getRandomKey() {
    return `o2h5-randow-${Date.now()}-${this.randomKey++}`
  }

  drawItem(item, timestamp) {
    const { easeType, allDistance, allTime, direction, opacity, offset } = item
    if (!item.startTime) item.startTime = timestamp
    if (!item.lastTime) item.lastTime = timestamp
    // 记录间隔是否过长，是则认为是进入了后台，暂停等，需要更新开始时间
    let lastGap = timestamp - item.lastTime
    if (lastGap > 500) {
      item.startTime = item.startTime + lastGap
    }
    let timeGap = timestamp - item.startTime
    if (timeGap < allTime) {
      let moveDis = this.moveFn[easeType](timeGap, 0, allDistance, allTime)
      this.context.fillStyle = `rgba(255, 255, 255, ${opacity})`
      if (direction === 'horizontal') {
        item.x = allDistance - moveDis - offset
      } else {
        item.y = allDistance - moveDis - offset
      }
      this.context.fillText(item.content, item.x, item.y)
      item.lastTime = timestamp
    } else {
      item.destroy(item)
    }
  }

  draw(timestamp) {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.font = '14px 微软雅黑'
    this.context.textBaseline = 'top'
    this.itemData.forEach((item) => {
      this.drawItem(item, timestamp)
    })

    this.timer = requestAnimationFrame(this.draw.bind(this))
  }

  stopBarrager () {
    cancelAnimationFrame(this.timer)
  }

  palyBarrager () {
    this.timer = requestAnimationFrame(this.draw.bind(this))
  }

  endBarrager() {
    this.itemData = []
    this.itemNum = 0
    this.hasNum = 0
    this.context.clearRect(0, 0, this.width, this.height)
    cancelAnimationFrame(this.timer)
  }

  resetBarrager(opts) {
    this.opts = opts || this.opts
    this.endBarrager()
    this.init()
  }
}

export default BarragerCanvas
