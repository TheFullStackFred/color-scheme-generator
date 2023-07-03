function toggleDarkMode(isDarkMode, body, darkMode, lightMode) {
  isDarkMode.value = !isDarkMode.value

  if (isDarkMode.value) {
    body.style.background = `${darkMode.background}`
    body.style.color = `${darkMode.color}`
  } else {
    body.style.background = `${lightMode.background}`
    body.style.color = `${lightMode.color}`
  }
}

function getColorScheme(hexCode, mode, renderColorScheme) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      renderColorScheme(data.colors)
    })
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function copyToClipboard(hexCode) {
  const cb = navigator.clipboard
  cb.writeText(hexCode).then(() =>
    alert(`Hex color code "${hexCode}" copied to clipboard`)
  )
}

export {
  toggleDarkMode,
  getColorScheme,
  capitalizeFirstLetter,
  copyToClipboard
}
