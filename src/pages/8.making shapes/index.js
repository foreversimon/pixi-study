import Renderer from '../1.创建一个简单的PIXI/renderer'
import Stage from '../2.创建舞台/stage'
import { Loader, Graphics, Sprite } from 'pixi.js'

export default {
  path: '/8',
  template: `
    <h2>8.making shapes</h2>
    <div id="pixi"></div>
    <a href="#/7">上一页</a>
    <a href="#/9">下一页</a>
  `,
  fn () {
    const renderer = Renderer(document.querySelector('#pixi'))
    const stage = Stage(renderer)
    const loader = new Loader()
    let state = play
    const line2 = new Graphics()
    loader
      .load(setup)

    let rectangle = new Graphics()
    rectangle.beginFill(0x0033CC)
    rectangle.lineStyle(4, 0xFF0000, 1)
    // rectangle.drawRect(0, 0, 96, 96) // 直角长方形
    rectangle.drawRoundedRect(0, 0, 96, 96, 12) // 圆角长方形
    rectangle.endFill()
    rectangle.x = 64
    rectangle.y = 64
    rectangle.alpha = 0.5
    stage.addChild(rectangle)

    let circle = new Graphics()
    circle.beginFill(0xFF9933)
    circle.lineStyle(4, 0x006600, 1)
    circle.drawCircle(0, 0, 48)
    circle.endFill()
    circle.x = 256
    circle.y = 112
    stage.addChild(circle)

    let ellipse = new Graphics()
    ellipse.beginFill(0xFFFF00)
    ellipse.lineStyle(4, 0x000000, 1)
    ellipse.drawEllipse(0, 0, 64, 32)
    ellipse.endFill()
    ellipse.x = 416
    ellipse.y = 112
    stage.addChild(ellipse)

    let line = new Graphics()
    line.lineStyle(4, 0x000000, 1)
    line.moveTo(0, 0)
    line.lineTo(100, 50)
    line.x = 64
    line.y = 212
    stage.addChild(line)

    let triangle = new Graphics()
    triangle.beginFill(0xFF3300)
    triangle.lineStyle(4, 0x336699, 1)
    triangle.moveTo(0, 0)
    triangle.lineTo(-64, 64)
    triangle.lineTo(64, 64)
    triangle.lineTo(0, 0)
    triangle.endFill()
    triangle.x = 320
    triangle.y = 192
    stage.addChild(triangle)

    let quadLine = new Graphics()
    quadLine.lineStyle(4, 0x000000, 1)
    quadLine.moveTo(32, 128)
    quadLine.quadraticCurveTo(128, 20, 224, 128)
    quadLine.x = 128
    quadLine.y = 128
    stage.addChild(quadLine)

    let bezierLine = new Graphics()
    bezierLine.lineStyle(4, 0x000000, 1)
    bezierLine.moveTo(32, 128)
    bezierLine.bezierCurveTo(32, 20, 224, 20, 224, 128)
    bezierLine.x = 256
    bezierLine.y = 256
    stage.addChild(bezierLine)

    let partialCircle = new Graphics()
    partialCircle.lineStyle(4, 0x00000, 1)
    partialCircle.arc(64, 64, 64, 3.14, 6.28, false)
    partialCircle.x = 64
    partialCircle.y = 416
    stage.addChild(partialCircle)

    let circle2 = new Graphics()
    circle2.beginFill(0xFF9933)
    circle2.lineStyle(4, 0x006600, 1)
    circle2.drawCircle(0, 0, 48)
    circle2.endFill()
    const circle2Texture = renderer.generateTexture(circle2)
    const circle2Sprite = new Sprite(circle2Texture)
    circle2Sprite.x = 240
    circle2Sprite.y = 64
    stage.addChild(circle2Sprite)

    let ctx = new Graphics()

    ctx.beginFill(0x0033CC)
    ctx.lineStyle(4, 0xFF0000, 1)
    ctx.drawRect(32, 32, 96, 96)
    ctx.endFill()

    ctx.beginFill(0xFF9933)
    ctx.lineStyle(0)
    ctx.drawCircle(224, 80, 80)
    ctx.endFill()

    ctx.lineStyle(4, 0x00000, 1)
    ctx.moveTo(320, 48)
    ctx.lineTo(420, 112)

    stage.addChild(ctx)

    stage.addChild(line2)

    line2.angleA = 0
    line2.angleB = 0


    function setup () {
      gameLoop()

      function gameLoop () {
        state()
        renderer.render(stage)
        requestAnimationFrame(gameLoop)
      }
    }
    function play () {
      line2.angleA += 0.02
      let rotatingA = rotateAroundPoint(64, 64, 20, 20, line2.angleA)
      line2.angleB += 0.02
      let rotatingB = rotateAroundPoint(192, 208, 20, 20, line2.angleB)

      line2.clear()

      line2.lineStyle(4, 0x000000, 1)
      line2.moveTo(rotatingA.x, rotatingA.y)
      line2.lineTo(rotatingB.x, rotatingB.y)
    }

    function rotateAroundPoint (pointX, pointY, distanceX, distanceY, angle) {
      let point = {}
      point.x = pointX + Math.cos(angle) * distanceX
      point.y = pointY + Math.sin(angle) * distanceY
      return point
    }
  }
}