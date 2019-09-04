/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_CLASSNAME
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'
import processLocalConfig from './utils/processLocalConfig'

import configKeys from './configs/keys'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const configKeyVal = getParameterByName('configKey')
const configKey = configKeys[configKeyVal] || configKeys['default']

const loadData = {
  "默认": {
    "0": {...window[O2_AMBIENT_CONFIG]}
  }
}
const allLoadData = processLocalConfig({ configKey, guiName: O2_AMBIENT_CLASSNAME, loadData })

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.isPaly = true
      this.backgroundColor = '#333'
      this.play = () => {
        if (this.isPaly) {
          window[O2_AMBIENT_MAIN].stopBarrager()
          this.isPaly = false
        } else {
          this.isPaly = true
          window[O2_AMBIENT_MAIN].playBarrager()
        }
      }
    }
  }

  // 主控制面板
  class Control extends Controller {
    constructor () {
      super()
      this.config = window[O2_AMBIENT_CONFIG]
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI({
        name: O2_AMBIENT_CLASSNAME,
        preset: configKey,
        load: {
          "remembered": { ...allLoadData.remembered }
        }
      })
      gui.useLocalStorage = true
      gui.remember(config)
      gui.addCallbackFunc(this.resetCanvas.bind(this))

      gui.add(otherConfig, 'play').name('播放 / 暂停')
      gui.addColor(otherConfig, 'backgroundColor').name('背景颜色（仅预览）').onFinishChange(val => {
        this.setBackgroundColor(val)
      })

      gui.add(config, 'allNum').name('总弹幕数')
      gui.add(config, 'showNum').name('一屏最多的弹幕数')
      gui.add(config, 'opacity', 0, 1).name('弹幕透明度')
      gui.add(config, 'speed', 0, 100).name('弹幕速度')
      gui.add(config, 'width').name('弹幕宽度').onFinishChange(val => {
        window[O2_AMBIENT_MAIN].reset()
        this.resetCanvas()
      })
      gui.add(config, 'height').name('弹幕高度').onFinishChange(val => {
        window[O2_AMBIENT_MAIN].reset()
        this.resetCanvas()
      })
      gui.add(config, 'fontSize').name('字体大小')
      gui.add(config, 'easeType', ['linear', 'easeIn', 'easeInOut', 'easeOut']).name('缓动函数').onFinishChange(() => {
        this.resetCanvas()
      })
      gui.addGroup(config,'contents').name('弹幕内容').onFinishChange(() => {
        this.resetCanvas()
      })
      this.gui = gui
      this.setGUIzIndex(2)
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit
