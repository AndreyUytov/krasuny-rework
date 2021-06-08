const MAX_VALUE = 300000

const rangeInputsWrapper = document.querySelector('.range-inputs-wrapper')

const minInput = rangeInputsWrapper.querySelector('.price-input--min')
const maxInput = rangeInputsWrapper.querySelector('.price-input--max')
const rangeWrapper = rangeInputsWrapper.querySelector('.range__wrapper')

rangeWrapper.addEventListener('pointerdown', (evt) => {
  let toggle = evt.target.closest('.range__toggle')
  if (!toggle) return
  toggle.ondragstart = () => false
  toggle.style.touchAction = 'none'
  toggle.setPointerCapture(evt.pointerId)

  let mutableProperty
  toggle.classList.contains('range__toggle--left')
    ? (mutableProperty = '--min-position')
    : (mutableProperty = '--max-position')

  let shiftX = evt.clientX - toggle.getBoundingClientRect().left
  let newPosition
  const rangeWrapperWidth = rangeWrapper.getBoundingClientRect().width
  let rightEdge = rangeWrapperWidth - 24
  let step = 100 / rightEdge
  let input
  if (toggle.classList.contains('range__toggle--left')) {
    input = minInput
  } else {
    input = maxInput
  }

  const moveAt = (evt) => {
    newPosition = evt.pageX - shiftX - rangeWrapper.getBoundingClientRect().left
    if (newPosition < 0) newPosition = 0
    if (newPosition > rightEdge) {
      newPosition = rightEdge
    }

    rangeWrapper.style.setProperty(mutableProperty, `${newPosition}px`)

    input.value = Math.ceil(newPosition * step) * (MAX_VALUE / 100)
  }

  toggle.addEventListener('pointermove', moveAt)

  const mouseUp = (evt) => {
    toggle.removeEventListener('pointermove', moveAt)
    toggle.removeEventListener('pointerup', mouseUp)
  }

  toggle.addEventListener('pointerup', mouseUp)
})
