import './css/package.scss'
if (process.env.NODE_ENV === 'development') {
  require('./js/control')
}
import './js/config'
import './js/ambient_prod'
