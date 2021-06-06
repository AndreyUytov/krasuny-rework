const popupConsultation = document.querySelector('.popup-consultation')

document.addEventListener('click', (evt) => {
  let buttonPopupConsultation = evt.target.closest('.popup-consultation-btn')
  if (!buttonPopupConsultation) return

  let bodyWidth = document.body.getBoundingClientRect.width
  document.body.style.width = `${bodyWidth}px`
  document.body.style.overflow = 'hidden'
  popupConsultation.hidden = false
})

popupConsultation.addEventListener('click', () => {
    document.body.style.width = ''
    document.body.style.overflow = ''
    popupConsultation.hidden = true
})