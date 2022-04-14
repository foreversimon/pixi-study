import Renderer from './renderer'

export default {
  path: '/',
  template: `
    <h2>1.创建一个简单的PIXI</h2>
    <div id="pixi"></div>
    <a href="#/2">下一页</a>
  `,
  fn ({ router }) {
    const renderer = Renderer(document.querySelector('#pixi'))
  }
}