import gameLoop from './gameLoop'

export default {
  path: '/6',
  template: `
    <h2>6.game loop</h2>
    <div id="pixi"></div>
    <a href="#/5">上一页</a>
    <a href="#/7">下一页</a>
  `,
  async fn () {
    gameLoop()
  }
}