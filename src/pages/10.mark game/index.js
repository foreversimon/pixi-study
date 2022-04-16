import main from './main'

export default {
  path: '/10',
  template: `
    <h2>10.game</h2>
    <div id="pixi"></div>
    <a href="#/9">上一页</a>
    <a href="#/11">下一页</a>
  `,
  fn: main.bind(window)
}