const textSanitizer = (rawTexts: string[]) => {
  const sanitizedTexts = rawTexts
    .map((item) => {
      return item
        .replaceAll(/[!@#$€£%¥₹₽₩^&*()\-_+=\[\]{}|;:'",.<>/?\\0-9]/g, '')
        .replaceAll(/\s+/g, ' ')
        .trim()
    })
    .filter((item) => {
      return 2 < item.length
    })

  return sanitizedTexts
}

export default textSanitizer
