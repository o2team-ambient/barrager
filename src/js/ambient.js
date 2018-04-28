import Preloader from 'preloader.js'
import Barrager from './components/barrager'
import values from 'lodash/values'
import {
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_INIT,
  O2_AMBIENT_MAIN
} from './components/const'

let barrager

function initAmbient () {
  try {
    if (barrager) {
      barrager.endBarrager()
      barrager = null
    }
    const canvas = document.getElementById('barrager_canvas')
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
