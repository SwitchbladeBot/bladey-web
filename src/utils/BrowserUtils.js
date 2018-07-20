function supportWebP () {
  const canvas = typeof document === 'object' ? document.createElement('canvas') : {}
  canvas.width = canvas.height = 1
  return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false
}

export default { supportWebP }
