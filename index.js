import { colorSchemeModes, defaultHexAndMode } from './color-scheme-modes.js'
import { darkMode, lightMode } from './dark-light-mode-themes.js'
import {
  toggleDarkMode,
  getColorScheme,
  capitalizeFirstLetter,
  copyToClipboard
} from './utils.js'

const isDarkMode = {
  value: false
}

const body = document.querySelector('body')
const header = document.querySelector('header')
const hexEl = document.querySelector('input[type="color"]')
const modeEl = document.createElement('select')
const getColorSchemeBtn = document.querySelector('button')
const mainEl = document.querySelector('main')
const footer = document.querySelector('footer')

document
  .getElementById('toggle-dark-mode')
  .addEventListener('click', () =>
    toggleDarkMode(isDarkMode, body, darkMode, lightMode)
  )

getColorSchemeBtn.addEventListener('click', () => {
  let hexCode = hexEl.value.slice(1)
  let mode = modeEl.value
  mainEl.innerHTML = ''
  footer.textContent = ''

  getColorScheme(hexCode, mode, renderColorScheme)
})

function renderDefaultColorScheme() {
  hexEl.value = `#${defaultHexAndMode.hex}`
  const hexCode = defaultHexAndMode.hex
  const mode = defaultHexAndMode.mode
  getColorScheme(hexCode, mode, renderColorScheme)
}

function createModeOptions() {
  colorSchemeModes.forEach((color) => {
    const option = document.createElement('option')
    option.value = color
    option.textContent = capitalizeFirstLetter(color)
    modeEl.appendChild(option)
  })
}

function renderColorScheme(colors) {
  colors.forEach((color) => {
    const colorEl = document.createElement('div')
    colorEl.style.background = `${color.hex.value}`

    colorEl.addEventListener('click', () => {
      copyToClipboard(color.hex.value)
    })

    const hexCodeEl = document.createElement('p')
    hexCodeEl.textContent = `${color.hex.value}`
    footer.appendChild(hexCodeEl)
    mainEl.appendChild(colorEl)
  })
}

createModeOptions()
renderDefaultColorScheme()
header.insertBefore(modeEl, getColorSchemeBtn)
