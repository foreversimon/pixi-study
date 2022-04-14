import Renderer from '../1.创建一个简单的PIXI/renderer'
import Stage from '../2.创建舞台/stage'
import Sprite from './sprite'

export default {
  path: '/3',
  template: `
    <h2>3.创建精灵图并放置在舞台中</h2>
    <div id="pixi"></div>
    <a href="#/2">上一页</a>
    <a href="#/4">下一页</a>
  `,
  async fn () {
    const renderer = Renderer(document.querySelector('#pixi'))
    const stage = Stage(renderer)
    const sprite = await Sprite(renderer, stage)

    // sprite.anchor.x = 0.5
    // sprite.anchor.y = 0.5
    sprite.rotation = 0.5
    sprite.x = 50
    sprite.y = 50
    sprite.pivot.set(25, 25)
    renderer.render(stage)
  }
}