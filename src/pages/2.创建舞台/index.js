import Renderer from '../1.创建一个简单的PIXI/renderer'
import Stage from './stage'

export default {
  path: '/2',
  template: `
    <h2>2.创建舞台</h2>
    <div id="pixi"></div>
    <a href="#/">上一页</a>
    <a href="#/3">下一页</a>
  `,
  fn ({ router }) {
    const renderer = Renderer(document.querySelector('#pixi'))
    const stage = Stage(renderer)
  }
}