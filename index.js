import colorSchemeMode from './colorSchemeMode.js'

const header = document.querySelector('header')
const hexEl = document.querySelector('input[type="color"]')
const modeEl = document.createElement('select')
const getColorBtn = document.querySelector('button')

getColorBtn.addEventListener('click', () => {
  let hexCode = hexEl.value.slice(1)
  let mode = modeEl.value

  fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach((color) => {
        console.log(color.hex.value)

        const div = document.createElement('div')
        div.style.background = `${color.hex.value}`
        document.querySelector('main').appendChild(div)
      })
    })
})

colorSchemeMode.forEach((color) => {
  const option = document.createElement('option')
  option.value = color
  option.textContent = color.charAt(0).toUpperCase() + color.slice(1)
  modeEl.appendChild(option)
})

header.insertBefore(modeEl, getColorBtn)
