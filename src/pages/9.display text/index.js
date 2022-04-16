import {
  autoDetectRenderer,
  Sprite,
  Container,
  Text,
  Loader
} from 'pixi.js'

export default {
  path: '/9',
  template: `
    <h2>9.display text</h2>
    <div id="pixi"></div>
    <a href="#/8">上一页</a>
    <a href="#/10">上一页</a>
  `,
  fn () {
    const renderer = autoDetectRenderer({
      width: 512,
      height: 512,
      antialias: false,
      backgroundAlpha: 0
    })
    renderer.view.style.border = '1px dashed'
    document.querySelector('#pixi').appendChild(renderer.view)
    const stage = new Container()
    const message = new Text('hello world', { fontSize: '48px', fill: 'red', fontFamily: 'Impact' })
    message.x = renderer.view.width / 2 - message.width / 2
    message.y = renderer.view.height / 2 - message.height / 2

    stage.addChild(message)
    renderer.render(stage)

    message.text = 'text changed!'
    message.style = ({ fill: 'white', font: '16px Helvetica' })
    message.style = ({ wordWrap: true, wordWrapWidth: 100 })

    setTimeout(() => {
        renderer.render(stage)
    }, 1000)
  }
}