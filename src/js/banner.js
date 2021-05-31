import HoverIntent from './hover-intent'

const bannerLinks = document.querySelectorAll('.banner__link')

Array.from(bannerLinks).forEach((elem) => {
  let card = elem.querySelector('.banner__little-card')
  let img = elem.querySelector('img')
  new HoverIntent({
    elem: img,
    over(evt) {
      card.style.left = evt.clientX + 5 + 'px'
      card.style.top = evt.clientY + 5 + 'px'
      card.style.display = 'flex'
    },
    out() {
      card.style.display = ''
    },
  })
})
