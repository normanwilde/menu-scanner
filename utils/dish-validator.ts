import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.EXPO_PUBLIC_OPEN_AI_API_KEY,
})

const openai = new OpenAIApi(configuration)
// TODO: improve the prompt. it shd not rely on previous answers
const dishValidator = async (stringArray: string[]) => {
  const prompt = `Map this array to an array of booleans indicating based on whether the item could be an item on a restaurant menu: ${stringArray}.`

  try {
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 2000, // 4000 caused error
    })

    /* Magic happening */
    const regex = /\[([^\]]*)\]/g
    const inputString = result.data.choices[0]?.message?.content
    if (inputString) {
      const match = regex.exec(inputString)
      if (match) {
        console.log({ match })
        return JSON.parse(match[0])
      }
    }
    return stringArray
  } catch (e) {
    console.error(e)
    return stringArray
  }
}

export default dishValidator
