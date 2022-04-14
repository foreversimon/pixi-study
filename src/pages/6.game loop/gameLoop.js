import * as PIXI from 'pixi.js'
import Renderer from '../1.创建一个简单的PIXI/renderer'
import Stage from '../2.创建舞台/stage'
import { Sprite, Loader } from 'pixi.js'
import keyboard from './keyboard'

async function fn () {
  const renderer = Renderer(document.querySelector('#pixi'))
  const stage = Stage(renderer)
  const sprite = await new Promise(resolve => {
    const loader = new Loader()
    loader.add('assets/img/sprite.png').load((loader, resources) => {
      const texture = resources['assets/img/sprite.png'].texture
      const sprite = new Sprite(texture)
      sprite.width = 50
      sprite.height = 50

      resolve(sprite)
    })
  })
  return {
    renderer,
    stage,
    sprite
  }
}

export default function setup () {
  fn().then(({ renderer, stage, sprite }) => {
    let pixie = sprite
    let state = acceleration_play
    let keyboardEvent = acceleration_keyboard_evnet()

    pixie.x = renderer.view.width / 2 - pixie.width / 2
    pixie.y = renderer.view.height / 2 - pixie.height / 2
    pixie.vx = 0
    pixie.vy = 0

    stage.addChild(pixie)

    gameLoop()

    function gameLoop () {
      requestAnimationFrame(gameLoop)
      state()
      renderer.render(stage)
    }

    function default_play () {
      pixie.x += pixie.vx
      pixie.y += pixie.vy
    }

    function default_keyboard_event () {
      let left = keyboard(37)
      let up = keyboard(38)
      let right = keyboard(39)
      let down = keyboard(40)
  
      left.press = () => {
        pixie.vx = -5
        pixie.vy = 0
      }
  
      left.release = () => {
        if (!right.isDown && pixie.vy === 0) {
          pixie.vx = 0
        }
      }
  
      up.press = () => {
        pixie.vy = -5
        pixie.vx = 0
      }
  
      up.release = () => {
        if (!down.isDown && pixie.vx === 0) {
          pixie.vy = 0
        }
      }
      right.press = () => {
        pixie.vx = 5
        pixie.vy = 0
      }
      right.release = () => {
        if (!left.isDown && pixie.vy === 0) {
          pixie.vx = 0
        }
      }
      down.press = () => {
        pixie.vy = 5
        pixie.vx = 0
      }
      down.release = () => {
        if (!up.isDown && pixie.vx === 0) {
          pixie.vy = 0
        }
      }

      return {
        up,
        down,
        right,
        left
      }
    }

    function acceleration_keyboard_evnet () {
      pixie.accelerationX = 0
      pixie.accelerationY = 0
      pixie.frictionX = 1
      pixie.frictionY = 1

      pixie.speed = 0.2
      pixie.drag = 0.98

      let left = keyboard(37)
      let up = keyboard(38)
      let right = keyboard(39)
      let down = keyboard(40)

      left.press = () => {
        pixie.accelerationX = -pixie.speed
        pixie.frictionX = 1
      }
      left.release = () => {
        if (!right.isDown) {
          pixie.accelerationX = 0
          pixie.frictionX = pixie.drag
        }
      }

      up.press = () => {
        pixie.accelerationY = -pixie.speed
        pixie.frictionY = 1
      }

      up.release = () => {
        if (!down.isDown) {
          pixie.accelerationY = 0
          pixie.frictionY = pixie.drag
        }
      }

      right.press = () => {
        pixie.accelerationX = pixie.speed
        pixie.frictionX = 1
      }

      right.release = () => {
        if (!left.isDown) {
          pixie.accelerationX = 0
          pixie.frictionX = pixie.drag
        }
      }

      down.press = () => {
        pixie.accelerationY = pixie.speed
        pixie.frictionY = pixie.drag
      }

      down.release = () => {
        if (!up.isDown) {
          pixie.accelerationY = 0
          pixie.frictionY = pixie.drag
        }
      }

      return {
        up,
        down,
        right,
        left
      }
    }
    function acceleration_play () {
      pixie.vx += pixie.accelerationX
      pixie.vy += pixie.accelerationY

      pixie.vx *= pixie.frictionX
      pixie.vy *= pixie.frictionY

      pixie.x += pixie.vx
      pixie.y += pixie.vy
    }
  })
}