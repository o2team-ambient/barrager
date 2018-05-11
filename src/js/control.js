/*
 * 控制面板
 */

import dat from 'dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_INIT
} from './components/const'
import { getParameterByName } from './components/utils'
import forEach from 'lodash/forEach'

 /* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const isShowController = getParameterByName('controller')
// console.log(isShowController, isLoop)

// 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
class OtherConfig {
  constructor () {
    this.isPaly = true
    this.message = '弹幕效果'
    this.backgroundColor = '#333'
    this.play = () => {
      if (this.isPaly) {
        window[O2_AMBIENT_MAIN].stopBarrager()
        this.isPaly = false
      } else {
        this.isPaly = true
        window[O2_AMBIENT_MAIN].palyBarrager()
      }
    }
  }
}

class Control {
  constructor () {
    this.isShow = isShowController
    this.config = window[O2_AMBIENT_CONFIG]
    this.otherConfig = new OtherConfig()
    this.initBaseGUI()
    this.initTextureGUI()
    this.setBackgroundColor(this.otherConfig.backgroundColor)
  }

  initBaseGUI () {
    const config = this.config
    const otherConfig = this.otherConfig
    const gui = new dat.GUI()
    gui.add(otherConfig, 'message').name('配置面板')
    gui.add(otherConfig, 'play').name('播放 / 暂停')
    gui.add(config, 'allNum').name('总弹幕数')
    gui.add(config, 'showNum').name('一屏最多的弹幕数')
    gui.add(config, 'opacity', 0, 1).name('弹幕透明度')
    gui.add(config, 'speed', 50, 1000).name('弹幕速度')
    gui.add(config, 'width').name('弹幕宽度').onFinishChange(val => {
      window[O2_AMBIENT_MAIN].resetBarrager()
    })
    // gui.add(config, 'height').name('弹幕高度').onFinishChange(val => {
    //   window[O2_AMBIENT_MAIN].resetBarrager()
    // })
    gui.add(config, 'easeType', ['linear', 'easeIn', 'easeInOut', 'easeOut']).name('缓动函数')
    gui.addColor(otherConfig, 'backgroundColor').name('背景颜色').onFinishChange(val => {
      Control.setBackgroundColor(val)
    })
    if (!this.isShow) gui.close()
    this.gui = gui
    this.setGUIzIndex(2)
  }

  initTextureGUI () {
    const gui = this.gui
    const contents = this.config.contents
    const contentsFolder = gui.addFolder('弹幕内容')
    let index = 0
    forEach(contents, (texture, key) => {
      const contentsController = contentsFolder.add(contents, key).name(`弹幕内容${index++}`)
    })
    contentsFolder.open()

    this.contentsFolder = contentsFolder
  }

  setGUIzIndex (zIndex) {
    this.gui.domElement.parentElement.style.zIndex = zIndex
  }

  setBackgroundColor (color) {
    let { width } = this.config
    let realWidth = document.documentElement.clientWidth
    let canvasWidth = width
    if (realWidth < width) {
      canvasWidth = realWidth
    }
    let canvasHeight = canvasWidth / 2
    const wpDom = document.getElementById('barrager_canvas_wp')
    wpDom.style.backgroundColor = color
    wpDom.style.height = canvasHeight + 'px'
    wpDom.style.width = canvasWidth + 'px'
  }
}

/* eslint-disable no-new */
isShowController === '1' && new Control()
