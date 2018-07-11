import EventEmitter from 'events'
import Guild from './Guild'
import User from './User'

export default class Discord extends EventEmitter {
  constructor (vm) {
    super()
    this.vm = vm
    this.updateStatus()
  }

  updateStatus () {
    if (!this.accessToken && this.vm.$session.exists()) {
      this.accessToken = this.vm.$session.get('accessToken')
    }

    if (this.accessToken) {
      return this.userProfile().then(p => {
        this.emit('login', p)
        this.user = p
        return p
      }).catch(res => {
        this.logout()
        return res
      })
    } else {
      return {
        then: function (f) {
          f(new Error('An error occured'))
        }
      }
    }
  }

  login (token) {
    return new Promise((resolve, reject) => {
      if (token) {
        this.accessToken = token
        this.vm.$session.start()
        this.vm.$session.set('accessToken', token)
        return resolve(this.updateStatus())
      }
      return reject(new Error('No token has been provided!'))
    })
  }

  logout () {
    this.vm.$session.destroy()
    this.vm.$router.push('/')
    this.accessToken = null
    this.emit('logout')
  }

  userProfile () {
    return this.vm.$http.get('https://discordapp.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    }).then(res => {
      return new User(res.body)
    })
  }

  guilds () {
    return this.vm.$http.get('https://discordapp.com/api/users/@me/guilds', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    }).then(res => {
      return res.body.map(g => new Guild(g))
    })
  }
}
