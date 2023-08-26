import axios from 'axios'
import { ITextDetectionResponseDTO } from '../typings/DTO'

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/texts`

const textRecognizer = async (image: string) => {
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
    const result = response.data

    const blocks = result.responses[0].fullTextAnnotation.pages[0].blocks

    const items2 = blocks.map((block) => {
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

    const items = blocks.map((block) => {
      const item = block.paragraphs.reduce(
        (previousParagraph, currentParagraph) => {
          return previousParagraph.concat(
            currentParagraph.words.reduce((previousWord, currentWord) => {
              return previousWord.concat(
                currentWord.symbols.reduce((previousSymbol, currentSymbol) => {
                  return previousSymbol.concat(currentSymbol.text)
                }, ' ')
              )
            }, '')
          )
        },
        ''
      )
      return item.trim()
    })

    // TODO: Add filtering for prices etc.
    return items2.flat()
  } catch (e) {
    console.error(e)
  }
}

export default textRecognizer
