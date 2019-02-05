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
    const vueDiscordOAuth = new VueDiscordOAuth({
      clientId: options.clientId,
      redirectUri: options.redirectUri
    })

    vueDiscordOAuth._state = new Vue({ data: {
      accessToken: null,
      user: null,
      guilds: null,
      logging: false
    }})

    Vue.mixin({
      mounted () {
        if (this.$route.meta.requiresAuth) {
          if (!this.$discord.logged && !this.$discord.logging) {
            this.$router.push('/')
            return this.$toast.open({
              duration: 3000,
              message: 'Authentication is required!',
              type: 'is-danger'
            })
          }

          if (typeof this.logged === 'function') {
            if (!this.$discord.logged) return this.$discord.on('login', () => this.logged())
            this.logged()
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
  constructor (options = {}) {
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

    this._clientId = options.clientId
    this._redirectUri = options.redirectUri
    this._apiURL = 'https://discordapp.com/api'
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
   * Logged getter.
   *
   * @returns {boolean}
   */
  get logged () {
    return this.accessToken
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

  loginPopup (clientID, redirectURI, scope = ['guilds', 'identify']) {
    const eScope = scope.join('%20')
    const oauthURL = `https://discordapp.com/oauth2/authorize?client_id=${this._clientId}&redirect_uri=${this._redirectUri}&response_type=token&scope=${eScope}`
    const options = Object.keys(this.popupOptions).map(k => `${k}=${this.popupOptions[k]}`).join(',')
    window.open(oauthURL, '_blank', options)
  }

  handleMessage ({ origin, data }) {
    if (origin !== window.location.origin || !data.access_token) return
    return this.login(data.access_token)
  }

  login (token) {
    this._state.logging = true
    return this.fetchUser(token)
      .then(user => {
        this._state.accessToken = token
        this._state.logging = false
        this.emit('_login')
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
    this.emit('_logout')
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
