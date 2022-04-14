import keyboard from "../6.game loop/keyboard"
import { Container, Loader, autoDetectRenderer, Sprite } from 'pixi.js'

export default {
  path: '/7',
  template: `
    <h2>7.boundary</h2>
    <div id="pixi"></div>
    <a href="#/6">上一页</a>
    <a href="#/8">下一页</a>
  `,
  async fn () {
    const pixi = document.querySelector('#pixi')
    const renderer = autoDetectRenderer({
      width: 512,
      height: 512,
      antialias: false,
      resolution: 1,
      backgroundAlpha: 0
    })
    
    renderer.view.style.border = '1px dashed'

    pixi.appendChild(renderer.view)
    
    const stage = new Container()
    
    const loader = new Loader()
    loader
      .add('assets/img/sprite.png')
      .load(setup)
    
    function setup (loader, resources) {
      const spriteTexture = resources['assets/img/sprite.png'].texture
      const sprite = new Sprite(spriteTexture)
      sprite.width = 50
      sprite.height = 50

      sprite.x = renderer.view.width / 2 - sprite.width / 2
      sprite.y = renderer.view.height / 2 - sprite.height / 2
      sprite.vx = 0
      sprite.vy = 0

      sprite.accelerationX = 0
      sprite.accelerationY = 0
      sprite.frictionX = 1
      sprite.frictionY = 1
      sprite.speed = 0.2
      sprite.drag = 0.98

      stage.addChild(sprite)

      let state = play

      let left = keyboard(37)
      let up = keyboard(38)
      let right = keyboard(39)
      let down = keyboard(40)

      left.press = () => {
        sprite.accelerationX = -sprite.speed
        sprite.frictionX = 1
      }
      left.release = () => {
        if (!right.isDown) {
          sprite.accelerationX = 0
          sprite.frictionX = sprite.drag
        }
      }
      up.press = () => {
        sprite.accelerationY = -sprite.speed
        sprite.frictionY = 1
      }
      up.release = () => {
        if (!down.isDown) {
          sprite.accelerationY = 0
          sprite.frictionY = sprite.drag
        }
      }
      right.press = () => {
        sprite.accelerationX = sprite.speed
        sprite.frictionX = 1
      }
      right.release = () => {
        if (!left.isDown) {
          sprite.accelerationX = 0
          sprite.frictionX = sprite.drag
        }
      }
      down.press = () => {
        sprite.accelerationY = sprite.speed
        sprite.frictionY = 1
      }
      down.release = () => {
        if (!up.isDown) {
          sprite.accelerationY = 0
          sprite.frictionY = sprite.drag
        }
      }

      gameLoop()

      function gameLoop () {
        state && state()
        renderer.render(stage)
        requestAnimationFrame(gameLoop)
      }

      function play () {
        sprite.vx += sprite.accelerationX
        sprite.vy += sprite.accelerationY

        sprite.vx *= sprite.frictionX
        sprite.vy *= sprite.frictionY

        sprite.x += sprite.vx
        sprite.y += sprite.vy

        let collision = contain(
          sprite,
          {
            x: 0,
            y: 0,
            width: renderer.view.width,
            height: renderer.view.height
          }
        )

        if (collision.has('left') || collision.has('right')) {
          sprite.vx = -sprite.vx
        }
        if (collision.has('top') || collision.has('bottom')) {
          sprite.vy = -sprite.vy
        }
      }

      function contain (sprite, layout = {}) {
        const { width = 512, height = 512, x = 0, y = 0 } = layout
        const set = new Set([])
        if (sprite.x < x) {
          sprite.x = x
          set.add('left')
        }
        if (sprite.y < y) {
          sprite.y = y
          set.add('top')
        }
        if (sprite.width + sprite.x > width) {
          sprite.x = width - sprite.width
          set.add('right')
        }
        if (sprite.height + sprite.y > height) {
          sprite.y = height - sprite.height
          set.add('bottom')
        }

        return set
      }

    }
  }
}