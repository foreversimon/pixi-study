export default function keyboard (keyCode) {
  let key = {}

  key.code = keyCode
  key.isDown = false
  key.isUp = true
  key.press = undefined
  key.release = undefined

  key.downHandler = e => {
    if (e.keyCode === key.code) {
      if (key.isUp && key.press) key.press()
      key.isDown = true
      key.isUp = false
    }
    e.preventDefault()
  }

  key.upHandler = e => {
    if (e.keyCode === key.code) {
      if (key.isDown && key.release) key.release()
      key.isDown = false
      key.isUp = true
    }
    e.preventDefault()
  }

  window.addEventListener('keydown', key.downHandler.bind(key), false)
  window.addEventListener('keyup', key.upHandler.bind(key), false)

  return key
}