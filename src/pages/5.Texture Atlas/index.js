import Renderer from '../1.创建一个简单的PIXI/renderer'
import Stage from '../2.创建舞台/stage'
import * as PIXI from 'pixi.js'

export default {
  path: '/5',
  template: `
    <h2>5.Texture Atlas</h2>
    <div id="pixi"></div>
    <a href="#/4">上一页</a>
    <a href="#/6">下一页</a>
  `,
  fn () {
    const renderer = Renderer(document.querySelector('#pixi'))
    const stage = Stage(renderer)
    const loader = new PIXI.Loader()
    loader
      .add('assets/img/treasureHunter.json')
      .load(setup)

    function setup (loader, resources) {
      const resource = resources['assets/img/treasureHunter.json']
      const textures = resource.textures
      const blob = getSprite('blob.png')
      const dungeon = getSprite('dungeon.png')
      const explorer = getSprite('explorer.png')
      const treasure = getSprite('treasure.png')
      const door = getSprite('door.png')


      dungeon.position.set(256, 256)
      explorer.position.set(68, 512 / 2 - explorer.height / 2)
      treasure.position.set(
        512 - treasure.width - 48,
        512 / 2 - treasure.height / 2
      )
      door.position.set(48, 16)

      stage.addChild(blob)
      stage.addChild(dungeon)
      stage.addChild(explorer)
      stage.addChild(treasure)
      stage.addChild(door)

      const numberOfBlobs = 6
      const spacing = 48
      const xOffset = 150

      for (let i = 0; i < numberOfBlobs; i++) {
        const blob = getSprite('blob.png')

        let x = spacing * i + xOffset

        let y = randomInt(0, 512 - blob.height)

        blob.position.set(x, y)

        stage.addChild(blob)
      }

      renderer.render(stage)

      function getSprite (id) {
        const texture = textures[id]
        texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        const sprite = new PIXI.Sprite(texture)
        return sprite
      }
    }
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}