const textSanitizer = (rawTexts: string[]) => {
  const sanitizedTexts = rawTexts
    .map((item) => {
      return item
        .replaceAll(/[!@#$€£%¥₹₽₩^&*()\-_+=\[\]{}|;:'",.<>/?\\0-9]/g, '') // Remove symbols
        .replaceAll(/\s+/g, ' ') // Change multiple spaces to single space
        .trim() // Remove spaces and new lines from start and end
        .toLowerCase() // Change string to all lowercase
        .split(' ') // Create array of the item contents
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize words
        .join(' ') // Transform array back to string
    })
    .filter((item) => {
      return 2 < item.length
    })

  console.log(sanitizedTexts)

  return sanitizedTexts
}

export default textSanitizer
