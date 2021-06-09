const css = `
:host {
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: #fff;
  box-sizing: border-box;

  box-shadow: var(--host-shadow, none);
}

:host * {
  box-sizing: border-box;

  font-family: 'Lato';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
}

.select__title {
  width: 100%;
  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 2px solid var(--border-bottom-color, rgba(51, 51, 51, 0.2));
}

.select__title:hover {
  --border-bottom-color: var(--akcent);
  --marker-color: var(--akcent);
}

.select__title-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select__svg {
  margin-left: 12px;
  flex-shrink: 0;

  --svg-fill: var(--marker-color);
}

.select__list {
  position: var(--list-position, static);
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 170px;
  padding-top: 10px;

  display: var(--display-list, none);
  flex-direction: column;
  align-items: flex-start;

  background-color: #fff;

  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 2000;
}

::slotted([slot='option']) {
  width: 100%;
  padding: 12px;
  padding-right: 30px;

  display: flex;
  justify-content: flex-start;
  background-color: var(--option-color, transparent);

  cursor: pointer;
  transition: all 0.4s ease-in-out;
}
`
// обязательные пункты - аттрибут title  у host  - заголовок селекта
// slot = "option" с data-value, где хранится значение для передачи наверх
// и обработки собтием "select-value"
// пример - 
//<custom-select title="Сортировать по">
//  <span data-value="price" slot="option">По цене</span>
//</custom-select>
class CustomSelect extends HTMLElement {
  constructor() {
    super()
    this.isOpen = false
    this.$title = null

    this.selectToggle = (evt) => {
      evt.stopPropagation()

      this.updateIsOpen()

      this.updateCurrentValue(evt)

      if (this.isOpen) {
        document.addEventListener('click', this.selectToggle)
      } else {
        document.removeEventListener('click', this.selectToggle)
      }
    }

    this.updateIsOpen = () => {
      this.isOpen = !this.isOpen

      if (this.isOpen) {
        this.style.setProperty('--display-list', 'flex') // показать/спрятать список опций
        this.style.setProperty('--marker-color', '#333333') // цвет маркера выпадающего списка
        this.style.setProperty('--border-bottom-color', 'var(--akcent)') // цвет бордера под выбранным пунктом
        // еще есть --option-color - определяющий цвет фона опции при наведении
        this.style.setProperty('--host-shadow', '0px 4px 18px rgba(0, 0, 0, 0.15)') // тень для host
        this.style.setProperty('--list-position', 'absolute')
      } else {
        this.style.setProperty('--display-list', 'none')
        this.style.setProperty('--marker-color', '')
        this.style.setProperty('--border-bottom-color', '')
        this.style.setProperty('--host-shadow', '')
        this.style.setProperty('--list-position', '')
      }
    }

    this.updateCurrentValue = (evt) => {
      let optionSlot = evt.target.closest('[slot="option"]')
      if (!optionSlot) return

      let optionSlotValue = optionSlot.dataset.value
      let optionSlotTextContent = optionSlot.textContent
      this.$title.textContent = optionSlotTextContent

      // событие select-value для отправки наверх значения выбранного пункта
      this.shadowRoot.dispatchEvent(new CustomEvent('select-value', {
        bubbles: true,
        composed: true,
        detail: optionSlotValue
      }))
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.addEventListener('click', this.selectToggle)

    this.render()
    this.$title = this.shadowRoot.querySelector('.select__title-text')
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="select__title">
        <span class="select__title-text">${this.getAttribute('title')}</span>
        <svg class="select__svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10H7Z" fill="var(--svg-fill, rgba(51, 51, 51, 0.3))"/>
        </svg>
      </div>
      <div class="select__list">
        <slot name="option"></slot>
      </div>
    `
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.selectToggle)
  }
}

customElements.define('custom-select', CustomSelect)
