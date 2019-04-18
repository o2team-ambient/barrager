import './utils/raf'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_INIT,
  O2_AMBIENT_CONFIG
} from './utils/const'
import Barrager from './barrager'

let wrapper = document.querySelector('.o2team_ambient_main')
if (!wrapper) {
  wrapper = document.createElement('div')
  wrapper.setAttribute('class', 'o2team_ambient_main')
  wrapper.setAttribute('id', 'o2team_ambient_main')
  const inner = document.createElement('canvas')
  inner.setAttribute('class', 'canvas_wp')
  inner.setAttribute('id', 'barrager_canvas_wp')
  inner.setAttribute('style', 'display: block; margin: 0 auto;')
  wrapper.insertAdjacentElement('beforeend', inner)
  document.body.insertAdjacentElement('beforeend', wrapper)
}
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

let barrager

// 初始化函数
export default function initAmbient () {
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
