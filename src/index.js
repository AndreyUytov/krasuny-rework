import './styles/index.scss'
import './images/svg/svg-sprite.js'

import './js/banner.js'
import './js/articles-slider'
import './js/popup-menu'
import './js/popup-selection'
import './js/range'
import './js/custom-select'
import './js/similar-slider'


document.addEventListener('select-value', (evt) => {
  console.log(evt.detail);
})