import Renderer from '../1.创建一个简单的PIXI/renderer'
import Stage from '../2.创建舞台/stage'
import { Loader, Rectangle, Texture, AnimatedSprite, utils } from 'pixi.js'
export default {
  path: '/11',
  template: `
    <h2>11.anime sprite</h2>
    <div id="pixi"></div>
    <a href="#/10">上一页</a>
    <a href="#/12">下一页</a>
  `,
  fn () {
    const renderer = Renderer(document.querySelector('#pixi'))
    const stage = Stage(renderer)
    const loader = new Loader()
    loader
      .add('assets/img/大熊.png')
      .load(setup)

    function setup (loader, resources) {
      const base = resources['assets/img/大熊.png'].texture
      const texture0 = new Texture(base)
      texture0.frame = new Rectangle(0, 0, 25, 40)
      const texture1 = new Texture(base)
      texture1.frame = new Rectangle(25, 0, 25, 40)
      const texture2 = new Texture(base)
      texture2.frame = new Rectangle(50, 0, 25, 40)
      const texture3 = new Texture(base)
      texture3.frame = new Rectangle(75, 0, 25, 40)

      let textures = [texture0, texture1, texture2, texture3]

      let pixie = new AnimatedSprite(textures)
      pixie.loop = true
      pixie.animationSpeed = 0.2
      pixie.updateAnchor = true

      stage.addChild(pixie)
      renderer.render(stage)

      pixie.gotoAndStop(1)

      let t
      requestAnimationFrame(t = () => {
        renderer.render(stage)
        requestAnimationFrame(t)
      })
    }
  }
}