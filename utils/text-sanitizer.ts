const textSanitizer = (rawTexts: string[]) => {
  const sanitizedTexts = rawTexts
    .map((item) => {
      return item.replaceAll(/[^a-zA-Z ]/g, '').trim()
    })
    .filter((item) => {
      return item.length < 50 && 2 < item.length
    })

  return sanitizedTexts
}

export default textSanitizer
