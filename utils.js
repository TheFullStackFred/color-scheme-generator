// Fetches the color scheme
function getColorScheme(hexCode, mode, renderColorScheme) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      renderColorScheme(data.colors)
    })
}

// Capitalize the first letter in the string from the parameter
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

//  Copy to clipboard on click
function copyToClipboard(hexCode) {
  const cb = navigator.clipboard
  cb.writeText(hexCode).then(() =>
    alert(`Hex color code "${hexCode}" copied to clipboard`)
  )
}

export { getColorScheme, capitalizeFirstLetter, copyToClipboard }
