const css = `
:host {
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

::slotted([slot='title']) {
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
  width: 100%;
  max-height: 170px;
  margin-top: 10px;

  display: var(--display-list, none);
  flex-direction: column;
  align-items: flex-start;

  overflow-y: auto;
}

::slotted([slot='option']) {
  width: 100%;
  padding: 12px;
  padding-right: 30px;

  display: flex;
  justify-content: flex-start;
  background-color: var(--option-color, transparent);

  cursor: pointer;
}
`

class CustomSelect extends HTMLElement {
  constructor() {
    super()
    this.isOpen = false

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
        this.style.setProperty('--display-list', 'flex')
        this.style.setProperty('--marker-color', '#333333')
        this.style.setProperty('--border-bottom-color', 'var(--akcent)')
      } else {
        this.style.setProperty('--display-list', 'none')
        this.style.setProperty('--marker-color', '')
        this.style.setProperty('--border-bottom-color', '')
      }
    }

    this.updateCurrentValue = (evt) => {
      let optionSlot = evt.target.closest('[slot="option"]')
      if (!optionSlot) return

      let optionSlotValue = optionSlot.dataset.value
      console.log(optionSlotValue)
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.addEventListener('click', this.selectToggle)

    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="select__title">
        <slot name="title">Выберите значение</slot>
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
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
  }
}

customElements.define('custom-select', CustomSelect)
