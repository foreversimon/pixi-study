import * as PIXI from 'pixi.js'

export default (el) => {
  const pixiEl = el
    const renderer = PIXI.autoDetectRenderer({
      // 画布宽度
      width: 512,
      // 画布高度
      height: 512,
      // 反锯齿
      antialias: false,
      // 透明度
      // transparent: true, // 6v之前版本
      backgroundAlpha: 0, // 6v属性
      // 分辨率
      resolution: 1
    })

    // 其实renderer.view就是画布的element
    renderer.view.style.border = '1px dashed black'

    pixiEl.appendChild(renderer.view)

    return renderer
}