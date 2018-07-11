import EventEmitter from 'events'
import Guild from './Guild'
import User from './User'
import snekfetch from 'snekfetch'

export default class Discord extends EventEmitter {
  updateStatus (token) {
    this.accessToken = token || this.accessToken
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
      const error = new Error('Invalid accessToken')
      this.emit('loginError', error)
      return { then: (f) => f(error) }
    }
  }

  login (token) {
    return new Promise((resolve, reject) => {
      if (token) {
        this.emit('token', token)
        return resolve(this.updateStatus(token))
      }
      return reject(new Error('No token has been provided!'))
    })
  }

  logout () {
    this.accessToken = null
    this.emit('logout')
  }

  userProfile () {
    return snekfetch.get('https://discordapp.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    }).then(res => {
      return new User(res.body)
    })
  }

  guilds () {
    return snekfetch.get('https://discordapp.com/api/users/@me/guilds', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    }).then(res => {
      return res.body.map(g => new Guild(g))
    })
  }
}
