import { LANGUAGES } from '../constants/data'

export interface IImageItemDTO {
  kind: string
  title: string
  htmlTitle: string
  link: string
  displayLink: string
  snippet: string
  htmlSnippet: string
  mime: string
  fileFormat: string
  image: {
    contextLink: string
    height: number
    width: number
    byteSize: number
    thumbnailLink: string
    thumbnailHeight: number
    thumbnailWidth: number
  }
}

export interface IImageSearchResponseDTO {
  items: IImageItemDTO[]
}

export type ITextDetectionResponseDTO = {
  responses: Array<{
    textAnnotations: Array<{
      locale?: string
      description: string
      boundingPoly: {
        vertices: Array<{
          x: number
          y: number
        }>
      }
    }>
    fullTextAnnotation: {
      pages: Array<{
        width: number
        height: number
        blocks: Array<{
          boundingBox: {
            vertices: Array<{
              x: number
              y: number
            }>
          }
          paragraphs: Array<{
            boundingBox: {
              vertices: Array<{
                x: number
                y: number
              }>
            }
            words: Array<{
              boundingBox: {
                vertices: Array<{
                  x: number
                  y: number
                }>
              }
              symbols: Array<{
                property: {
                  detectedBreak: {
                    type: string
                  }
                }
                boundingBox: {
                  vertices: Array<{
                    x: number
                    y: number
                  }>
                }
                text: string
                confidence: number
              }>
              confidence: number
            }>
            confidence: number
          }>
          blockType: string
          confidence: number
        }>
        confidence: number
      }>
      text: string
    }
  }>
}

export interface ITextTranslationItemDTO {
  translatedText: string
  detectedSourceLanguage: keyof typeof LANGUAGES
}

export interface ITextTranslationDTO {
  data: {
    translations: ITextTranslationItemDTO[]
  }
}
