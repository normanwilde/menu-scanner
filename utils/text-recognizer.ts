import axios from 'axios'
import { ITextDetectionResponseDTO } from '../typings/DTO'

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/texts`

export const textRecognizer = async (image: string) => {
  try {
    const body = {
      requests: [
        {
          image: {
            content: image,
          },
          features: [{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 }],
        },
      ],
    }

    const response = await axios.post<ITextDetectionResponseDTO>(API_URL, body)

    const blocks = response.data.responses[0].fullTextAnnotation.pages[0].blocks

    const items = blocks.map((block) => {
      return block.paragraphs.map((paragraph) => {
        return paragraph.words
          .reduce((previousWord, currentWord) => {
            return previousWord.concat(
              currentWord.symbols.reduce((previousSymbol, currentSymbol) => {
                return previousSymbol.concat(currentSymbol.text)
              }, ' ')
            )
          }, '')
          .trim()
      })
    })

    return items.flat()
  } catch (e) {
    console.error(e)
  }
}
