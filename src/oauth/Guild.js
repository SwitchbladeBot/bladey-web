export default class Guild {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.icon = data.icon
    this.owner = data.owner
    this.permissions = data.permissions
  }

  get iconURL () {
    return this.icon ? `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.jpg` : null
  }

  hasPermission (permission) {
    if (this.owner) return true
    if (this.permissions & 0x8) return true
    return !!(this.permissions & permission)
  }
}
