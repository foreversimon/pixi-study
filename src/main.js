import Router from './common/Router'
import A0 from './pages/1.创建一个简单的PIXI'
import B0 from './pages/2.创建舞台'
import C0 from './pages/3.创建精灵图并放置在舞台中'
import D0 from './pages/4.tileset'
import E0 from './pages/5.Texture Atlas'
import F0 from './pages/6.game loop'
import G0 from './pages/7.boundary'
import H0 from './pages/8.making shapes'
import J0 from './pages/9.display text'

const router = new Router({
  el: document.querySelector('#app'),
  routes: [
    A0,
    B0,
    C0,
    D0,
    E0,
    F0,
    G0,
    H0,
    J0
  ]
})