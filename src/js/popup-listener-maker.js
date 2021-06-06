export default function popupListenerMaker (popup, buttonPopup) {

  if(!popup || !buttonPopup)  return

  buttonPopup.addEventListener('click', () => {
    popup.hidden = false
    let widthBody = document.body.getBoundingClientRect().width
    document.body.style.width = `${widthBody}px`
    document.body.style.overflow = 'hidden'
  })

  popup.addEventListener('click', () => {
    document.body.style.width = ''
    document.body.style.overflow = ''
    popup.hidden = true
  })
}