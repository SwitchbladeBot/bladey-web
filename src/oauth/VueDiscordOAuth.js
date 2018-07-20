import EventEmitter from 'events'

import Guild from './Guild'
import User from './User'

export default {
  /**
   * Install vue-discord-oauth plugin
   *
   * @param {Vue} Vue
   * @param {Object} options
   */
  install: (Vue, options = {}) => {
    if (typeof process !== 'undefined' &&
      (
        process.server ||
        process.SERVER_BUILD ||
        (process.env && process.env.VUE_ENV === 'server')
      )
    ) {
      return
    }

    const name = options.name || 'discord'
    const vueDiscordOAuth = new VueDiscordOAuth()
    vueDiscordOAuth._state = new Vue({ data: {
      accessToken: null,
      user: null,
      guilds: null,
      logging: false
    }})

    Vue.mixin({
      mounted () {
        if (!window[vueDiscordOAuth._loginCallback]) {
          Object.defineProperty(window, vueDiscordOAuth._loginCallback, {
            value: vueDiscordOAuth.login.bind(vueDiscordOAuth),
            writable: false,
            enumerable: false,
            configurable: false
          })
        }

        if (this.$route.meta.requiresAuth) {
          if (!this.$discord.logged && !this.$discord.logging) {
            if (this.onFailed) this.onFailed()
            else {
              this.$router.push('/')
              this.$toast.open({
                duration: 3000,
                message: 'Authentication is required!',
                type: 'is-danger'
              })
            }
          } else if (this.onLogin) {
            if (this.$discord.logged) this.onLogin()
            else this.$discord.state.$on('login', () => this.onLogin())
          }
        }
      }
    })

    Vue[name] = vueDiscordOAuth
    Vue.prototype[`$${name}`] = vueDiscordOAuth
  }
}

class VueDiscordOAuth extends EventEmitter {
  /**
   * VueDiscordOAuth constructor
   */
  constructor () {
    super()
    this._popupOptions = {
      directories: 0,
      titlebar: 0,
      toolbar: 0,
      status: 0,
      menubar: 0,
      location: false,
      scrollbars: 'no',
      resizable: 'no',
      height: 570,
      width: 500
    }

    this._apiURL = 'https://discordapp.com/api'
    this._loginCallback = '__DISCORD_LOGIN__'
  }

  /**
   * LoginCallback getter.
   *
   * @returns {string}
   */
  get loginCallback () {
    return this._loginCallback
  }

  /**
   * State getter.
   *
   * @returns {Vue}
   */
  get state () {
    return this._state
  }

  /**
   * AccessToken getter.
   *
   * @returns {string}
   */
  get accessToken () {
    return this._state.accessToken
  }

  /**
   * User getter.
   *
   * @returns {User}
   */
  get user () {
    return this._state.user
  }

  /**
   * Guilds getter.
   *
   * @returns {Array<Guild>}
   */
  get guilds () {
    return this._state.guilds
  }

  /**
   * Logging getter.
   *
   * @returns {boolean}
   */
  get logging () {
    return this._state.logging
  }

  /**
   * PopupOptions getter.
   *
   * @returns {Object}
   */
  get popupOptions () {
    return this._popupOptions
  }

  /**
   * PopupOptions setter.
   *
   * @param {Object} value
   */
  set popupOptions (value) {
    this._popupOptions = value || {}
  }

  /**
   * Logged getter.
   *
   * @returns {boolean}
   */
  get logged () {
    return !!this.accessToken
  }

  loginPopup (clientID, redirectURI, scope = ['guilds', 'identify']) {
    const eScope = scope.join('%20')
    const oauthURL = `https://discordapp.com/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=${eScope}`
    const options = Object.keys(this.popupOptions).map(k => `${k}=${this.popupOptions[k]}`).join(',')
    window.open(oauthURL, '_blank', options)
  }

  login (token) {
    this._state.logging = true
    return this.fetchUser(token)
      .then(user => {
        this._state.accessToken = token
        this._state.logging = false
        this.emit('login')
        return user
      })
      .catch(e => {
        this._state.logging = false
        return Promise.reject(e || new Error('Invalid request'))
      })
  }

  logout () {
    this._state.accessToken = null
    this._state.user = null
    this._state.guilds = null
    this._state.logging = false
    this.emit('logout')
  }

  fetchUser (token = this.accessToken) {
    return this._request('/users/@me', token).then(user => {
      this._state.user = new User(user)
      return this.user
    }).catch(e => Promise.reject(e || new Error('Invalid request')))
  }

  fetchGuilds (token = this.accessToken) {
    return this._request('/users/@me/guilds', token).then(guilds => {
      this._state.guilds = guilds.map(g => new Guild(g))
      return this.guilds
    }).catch(e => Promise.reject(e || new Error('Invalid request')))
  }

  _request (endpoint, token) {
    return fetch(`${this._apiURL}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => res.ok ? res.json() : Promise.reject(res))
  }
}
