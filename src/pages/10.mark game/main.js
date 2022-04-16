import * as PIXI from 'pixi.js'
import keyboard from "../6.game loop/keyboard"

export default function () {
  window.b = new Bump(PIXI)

  const renderer = new PIXI.autoDetectRenderer({
    width: 512,
    height: 512,
    antialias: false,
    backgroundAlpha: 0,
    resolution: 1
  })
  renderer.view.style.border = '1px dashed'
  document.querySelector('#pixi').appendChild(renderer.view)
  const stage = new PIXI.Container()
  const gameScene = new PIXI.Container()
  stage.addChild(gameScene)
  const gameOverScene = new PIXI.Container()
  stage.addChild(gameOverScene)
  gameOverScene.visible = false
  const loader = new PIXI.Loader()
  loader
    .add('assets/img/treasureHunter.json')
    .load(setup)

  let state
  function setup (loader, resources) {
    window.treasureHunter = resources['assets/img/treasureHunter.json']

    window.dungon = new PIXI.Sprite(treasureHunter.textures['dungeon.png'])
    dungon.position.set(renderer.width / 2, renderer.height / 2)
    gameScene.addChild(dungon)

    window.door = new PIXI.Sprite(treasureHunter.textures['door.png'])
    door.position.set(64, door.height / 2)
    gameScene.addChild(door)

    window.explorer = new PIXI.Sprite(treasureHunter.textures['explorer.png'])
    explorer.x = 68
    explorer.y = gameScene.height / 2 - explorer.height / 2
    explorer.vx = 0
    explorer.vy = 0

    let left = keyboard(37)
    let up = keyboard(38)
    let right = keyboard(39)
    let down = keyboard(40)

    left.press = () => {
      explorer.vx = -1
      explorer.vy = 0
    }
    left.release = () => {
      if (!right.isDown && explorer.vy === 0) {
        explorer.vx = 0
      }
    }
    right.press = () => {
      explorer.vx = 1
      explorer.vy = 0
    }
    right.release = () => {
      if (!left.isDown && explorer.vy === 0) {
        explorer.vx = 0
      }
    }
    up.press = () => {
      explorer.vx = 0
      explorer.vy = -1
    }
    up.release = () => {
      if (!down.isDown && explorer.vx === 0) {
        explorer.vy = 0
      }
    }
    down.press = () => {
      explorer.vx = 0
      explorer.vy = 1
    }
    down.release = () => {
      if (!up.isDown && explorer.vx === 0) {
        explorer.vy = 0
      }
    }

    gameScene.addChild(explorer)
    window.treasure = new PIXI.Sprite(treasureHunter.textures['treasure.png'])
    treasure.x = gameScene.width - treasure.width - 48
    treasure.y = gameScene.height / 2 - treasure.height / 2
    gameScene.addChild(treasure)

    let numberOfBlobs = 6,
      spacing = 48,
      xOffset = 150,
      speed = 2,
      direction = 1

      window.blobs = []

    for (let i = 0; i < numberOfBlobs; i++) {
      let blob = new PIXI.Sprite(treasureHunter.textures['blob.png'])
      let x = spacing * i + xOffset
      let y = randomInt(0, stage.height - blob.height)

      blob.x = x
      blob.y = y

      blob.vy = speed * direction

      direction *= -1

      blobs.push(blob)

      gameScene.addChild(blob)
    }

    window.healthBar = new PIXI.Container()
    healthBar.position.set(stage.width - 170, 4)
    gameScene.addChild(healthBar)

    window.innerBar = new PIXI.Graphics()
    innerBar.beginFill(0x000000)
    innerBar.drawRect(0, 0, 100, 8)
    innerBar.endFill()
    healthBar.addChild(innerBar)

    window.outerBar = new PIXI.Graphics()
    outerBar.beginFill(0xFF3300)
    outerBar.drawRect(0, 0, 100, 8)
    outerBar.endFill()
    healthBar.addChild(outerBar)

    healthBar.outer = outerBar

    healthBar.outer.width = 100

    window.message = new PIXI.Text('The End!', { font: '48px Futura' })
    gameOverScene.addChild(message)

    state = play
    gameLoop()
  }

  function gameLoop () {
    state && state()
    renderer.render(stage)
    requestAnimationFrame(gameLoop)
  }

  function play () {

    explorer.x += explorer.vx
    explorer.y += explorer.vy
    contain(explorer, {
      x: 32,
      y: 32,
      width: 480,
      height: 480
    })

    blobs.forEach(blob => {
      blob.y += blob.vy
      let blobHitsWall = contain(
        blob,
        { x: 32, y: 32, width: 480, height: 480 }
      )

      if (blobHitsWall) {
        if (blobHitsWall.has('top') || blobHitsWall.has('bottom')) {
          blob.vy *= -1
        }
      }

      if (b.hitTestRectangle(explorer, blob)) {
        window.explorerHit = true
      }
    })

    if (window.explorerHit) {
      explorer.alpha = 0.5
      healthBar.outer.width -= 1
      window.explorerHit = false
    } else {
      explorer.alpha = 1
    }

    if (b.hitTestRectangle(explorer, treasure)) {
      treasure.x = explorer.x + 8
      treasure.y = explorer.y + 8
    }

    if (b.hitTestRectangle(treasure, door)) {
      state = end
      message.text = 'You won!'
    }

    if (healthBar.outer.width < 0) {
      state = end
      message.text = 'You lost!'
    }
  }

  function end () {
    gameScene.visible = false
    gameOverScene.visible = true
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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