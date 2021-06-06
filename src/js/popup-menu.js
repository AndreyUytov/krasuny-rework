const popupMenu = document.querySelector('.popup-menu')
const popupMenuBtn = document.querySelector('.page-header__catalog-btn')

popupMenuBtn.addEventListener('click', () => {
  popupMenu.hidden = false
  document.body.style.overflow = 'hidden'
})

popupMenu.addEventListener('click', () => {
  document.body.style.overflow = ''
  popupMenu.hidden = true
})