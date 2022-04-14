import Renderer from '../1.创建一个简单的PIXI/renderer'
import Stage from '../2.创建舞台/stage'
import * as PIXI from 'pixi.js'

export default {
  path: '/4',
  template: `
    <h2>4.tileset</h2>
    <div id="pixi"></div>
    <a href="#/3">上一页</a>
    <a href="#/5">下一页</a>
  `,
  fn () {
    const renderer = Renderer(document.querySelector('#pixi'))
    const stage = Stage(renderer)
    const loader = new PIXI.Loader()
    loader
      .add('assets/img/tileset.png')
      .load(setup)

    function setup (loader, resources) {
      const resource = resources['assets/img/tileset.png']
      const texture = resource.texture
      const rectangle = new PIXI.Rectangle(160, 256, 32, 32)
      texture.frame = rectangle
      texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
      const adventuress = new PIXI.Sprite(texture)

      adventuress.position.set(64, 64)
      adventuress.scale.set(3, 3)
      stage.addChild(adventuress)
      renderer.render(stage)
    }
  }
}