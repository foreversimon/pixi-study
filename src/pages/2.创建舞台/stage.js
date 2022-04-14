import * as PIXI from 'pixi.js'

export default (renderer) => {
  const stage = new PIXI.Container()

  renderer.render(stage)

  return stage
}