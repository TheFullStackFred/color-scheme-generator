import { colorSchemeModes, defaultHexAndMode } from './colorSchemeModes.js'

const header = document.querySelector('header')
const hexEl = document.querySelector('input[type="color"]')
const modeEl = document.createElement('select')
const getColorBtn = document.querySelector('button')
const mainEl = document.querySelector('main')
const footer = document.querySelector('footer')

getColorBtn.addEventListener('click', () => {
  let hexCode = hexEl.value.slice(1)
  let mode = modeEl.value
  console.log(hexCode, mode)
  mainEl.innerHTML = ''
  footer.textContent = ''

  getColorScheme(hexCode, mode, renderColorScheme)
})

function createModeOptions() {
  colorSchemeModes.forEach((color) => {
    const option = document.createElement('option')
    option.value = color
    option.textContent = color.charAt(0).toUpperCase() + color.slice(1)
    modeEl.appendChild(option)
  })
}

function getColorScheme(hexCode, mode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      renderColorScheme(data.colors)
    })
}

function renderColorScheme(colors) {
  colors.forEach((color) => {
    const colorEl = document.createElement('div')
    colorEl.style.background = `${color.hex.value}`
    const hexCodeEl = document.createElement('p')
    hexCodeEl.textContent = `${color.hex.value}`
    footer.appendChild(hexCodeEl)
    mainEl.appendChild(colorEl)
  })
}

function renderDefaultColorSchema() {
  const hexCode = defaultHexAndMode.hex
  const mode = defaultHexAndMode.mode
  getColorScheme(hexCode, mode)
}

createModeOptions()
renderDefaultColorSchema()
header.insertBefore(modeEl, getColorBtn)
