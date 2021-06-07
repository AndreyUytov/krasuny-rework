import Slider from './custom-slider.js'

const $container = document.querySelector('.articles__list-wrapper')

function articlesSliderMaker() {
  if (!$container) return

  const $sliderList = $container.querySelector('.articles__list')

  const $controllers = document.querySelector('.articles__controllers')
  const $prevBtn = $controllers.querySelector('.controllers__prev-btn')
  const $nextBtn = $controllers.querySelector('.controllers__next-btn')
  const $progress = $controllers.querySelector('.articles__proggress')

  const changeCurrentPositionCallBackSlider = (sliderContext) => {
    let allSlides = Math.floor(
      Math.abs(sliderContext.maxX / sliderContext.step)
    )
    sliderContext.updateCurrentSlide()
    let currentSlide = sliderContext.currentSlide

    $progress.style.width = `${(currentSlide / allSlides) * 100}%`
  }

  const articlestSlider = new Slider({
    container: $container,
    sliderList: $sliderList,
    prevButton: $prevBtn,
    nextButton: $nextBtn,
    changeCurrentXCallBack: changeCurrentPositionCallBackSlider,
  })
}

articlesSliderMaker()
