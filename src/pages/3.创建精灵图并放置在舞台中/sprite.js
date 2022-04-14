import * as PIXI from 'pixi.js'

export default async function (renderer, stage) {
  // 图片地址
  const spritePng = 'assets/img/sprite.png'

  // 有三种方法可以加载精灵
  // 第一种方法(必须在材质缓存中才可以使用)
  const way1 = () => {
    let texture = PIXI.utils.TextureCache[spritePng]
    let sprite = new PIXI.Sprite(texture)
    return {
      texture,
      sprite
    }
  }
  // 第二种方法(需等待回调)
  const way2 = () => {
    const loader = new PIXI.Loader()
    return new Promise(resolve => {
      // add可以传一个数组, 也可以连续.add多次
      loader.add(spritePng).load((loader, resources) => {
        let sprite = new PIXI.Sprite(resources[spritePng].texture)
        sprite.width = 50
        sprite.height = 50
        resolve(sprite)
      })
    })
  }
  // 第三种方法(直接生成)
  const way3 = () => {
    let sprite = PIXI.Sprite.from(spritePng)
    return sprite
  }
  // 使用Image生成sprite
  const createSpriteByImage = () => {
    const img = new Image()
    const base = new PIXI.BaseTexture(img)
    const texture = new PIXI.Texture(base)
    return new PIXI.Sprite(texture)
  }
  // 从canvasElement生成sprite
  const createSpriteByCanvas = () => {
    // const canvas = document.createElement('canvas')
    // ...v6需要canvas转二进制再传入, 或者转Image对象
  }

  // 这里用第二种方法生成精灵
  const sprite = await way2()
  // 加入进舞台
  stage.addChild(sprite)
  // 加进舞台后需要重新渲染一下
  renderer.render(stage)

  // 其他方法
  // 隐藏
  const hidden = () => {
    sprite.visible = false
    renderer.render(stage)
  }
  // 从舞台中移除精灵
  const remove = () => {
    stage.removeChild(sprite)
    renderer.render(stage)
  }

  // 直接摧毁精灵
  const destroy = () => {
    // 第一个boolean是关于当前精灵的材质
    // 第二个boolean是基础材质相关
    sprite.destroy(true, true)
    renderer.render(stage)
  }
  // 摧毁所有缓存的材质
  const destroyCache = () => {
    Object.keys(PIXI.utils.TextureCache).forEach(texture => {
      PIXI.utils.TextureCache[texture].destroy(true)
    })
  }
  return sprite
}