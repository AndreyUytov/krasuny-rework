import Slider from './custom-slider'

const wrapper = document.querySelector('.card-main__similar-wrapper')
const container = wrapper.querySelector('.similar__list-wrapper')
const sliderList = wrapper.querySelector('.similar__list')
const prevButton = wrapper.querySelector('.similar__list-controll--prev')
const nextButton = wrapper.querySelector('.similar__list-controll--next')

new Slider({
  container,
  sliderList,
  prevButton,
  nextButton
})