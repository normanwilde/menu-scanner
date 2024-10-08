import axios from 'axios'
import { IAIResponseDTO } from '../typings/DTO'

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/ai`

export const dishValidator = async (
  stringArray: string[],
  language: string
) => {
  try {
    const body = {
      language,
      text: stringArray.join(' '),
    }

    const response = await axios.post<IAIResponseDTO>(API_URL, body)
    return response.data
  } catch (e) {
    console.error(e)
    throw new Error()
  }
}
