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
console.log(defaultHexAndMode.hex)

const body = document.querySelector('body')
const header = document.querySelector('header')
const hexEl = document.querySelector('input[type="color"]')
const modeEl = document.createElement('select')
const getColorSchemeBtn = document.querySelector('button')
const mainEl = document.querySelector('main')
const footer = document.querySelector('footer')

// Event listener for toggle darkmode
document
  .getElementById('toggle-dark-mode')
  .addEventListener('click', () =>
    toggleDarkMode(isDarkMode, body, darkMode, lightMode)
  )

// Event listener on getColorSchemeBtn to trigger the fetch
getColorSchemeBtn.addEventListener('click', () => {
  let hexCode = hexEl.value.slice(1)
  let mode = modeEl.value

  mainEl.innerHTML = ''
  footer.textContent = ''

  getColorScheme(hexCode, mode, renderColorScheme)
})

// Render the default color scheme when the page is initially loaded
function renderDefaultColorSchema() {
  hexEl.value = `#${defaultHexAndMode.hex}`
  const hexCode = defaultHexAndMode.hex
  const mode = defaultHexAndMode.mode
  getColorScheme(hexCode, mode, renderColorScheme)
}

// Creates options for the select menu
function createModeOptions() {
  colorSchemeModes.forEach((color) => {
    const option = document.createElement('option')
    option.value = color
    option.textContent = capitalizeFirstLetter(color)
    modeEl.appendChild(option)
  })
}

// Render the chosen color scheme
function renderColorScheme(colors) {
  colors.forEach((color) => {
    const colorEl = document.createElement('div')
    colorEl.style.background = `${color.hex.value}`

    // Event listener to copy content on click
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
renderDefaultColorSchema()
header.insertBefore(modeEl, getColorSchemeBtn)
