import Barrager from './components/barrager'
import {
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_INIT,
  O2_AMBIENT_MAIN
} from './components/const'

let barrager

function initAmbient() {
  try {
    if (barrager) {
      barrager.endBarrager()
      barrager = null
    }
    const canvas = document.createElement('canvas')
    canvas.style = 'pointer-events: none; position:fixed; top:0; left:50%; transform: translateX(-50%); max-width: 100%; height: 300px; z-index: 1'
    canvas.id = 'barrager_canvas'
    document.body.appendChild(canvas)
    const opts = window[O2_AMBIENT_CONFIG]
    barrager = new Barrager(canvas, opts)
    barrager.init()
    window[O2_AMBIENT_MAIN] = barrager
  } catch (err) {
    console.log(err)
  }
}

window[O2_AMBIENT_INIT] = initAmbient
initAmbient()
