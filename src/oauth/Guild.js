function supportWebP () {
  const canvas = typeof document === 'object' ? document.createElement('canvas') : {}
  canvas.width = canvas.height = 1
  return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false
}

export default class Guild {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.icon = data.icon
    this.owner = data.owner
    this.permissions = data.permissions
  }

  get iconURL () {
    const imageExt = `${supportWebP() ? '.webp' : '.png'}?size=2048`
    return this.icon ? `https://cdn.discordapp.com/icons/${this.id}/${this.icon}${imageExt}` : null
  }

  get nameAcronym () {
    return this.name.replace(/\w+/g, name => name[0]).replace(/\s/g, '')
  }

  hasPermission (permission) {
    if (this.owner) return true
    if (this.permissions & 0x8) return true
    return !!(this.permissions & permission)
  }
}
