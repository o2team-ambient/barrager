import './utils/raf'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_INIT,
  O2_AMBIENT_CONFIG
} from './utils/const'
import Barrager from './barrager'

const wrapper = document.querySelector('.o2team_ambient_main')
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

let barrager

function initAmbient () {
  try {
    if (barrager) {
      barrager.endBarrager()
      barrager = null
    }
    const canvas = document.getElementById('barrager_canvas_wp')
    const opts = window[O2_AMBIENT_CONFIG]
    barrager = new Barrager(canvas, opts)
    barrager.init()
    window[O2_AMBIENT_MAIN] = barrager
  } catch (err) {
    console.log(err)
  }
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient

try {
  // 保证配置读取顺序
  let csi = setInterval(() => {
    if (!window[O2_AMBIENT_CONFIG]) return
    clearInterval(csi)
    initAmbient()
  }, 1000)
} catch (e) {
  console.log(e) 
}
