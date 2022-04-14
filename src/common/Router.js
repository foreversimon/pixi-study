class Router {
  current = {
    path: '/',
    template: '',
    fn: () => {}
  }

  constructor ({ routes = [], el }) {
    this.routes = routes
    this.el = el

    this._initRouter(routes, el)
  }

  /**
   * 
   * @param {*} routes 
   * @param {HTMLElement} el 
   */
  _initRouter (routes, el) {
    const router = this
    const observer = new MutationObserver(() => {
      router.current.fn.call(window, { router })
    })
    observer.observe(el, {
      attributes: false,
      childList: true
    })
    router._handleHashChange = () => {
      const hash = location.hash
      const routePath = hash.replace(/^\#/, '').replace(/\?.*$/, '')
      const find = routes.find(item => item.path === routePath)

      if (find) {
        this.current = find
        el.innerHTML = find.template
      } else {
        el.innerHTML = '<h1>Error 404</h1>'
        this._resetCurrent()
      }
    }
    router._handleHashChange()
    window.addEventListener('hashchange', router._handleHashChange)
  }

  _resetCurrent () {
    this.current = {
      path: '/',
      template: '',
      fn: () => {}
    }
  }

  push (path) {
    location.hash = path
  }

  back () {
    window.history.back()
  }
}

export default Router
