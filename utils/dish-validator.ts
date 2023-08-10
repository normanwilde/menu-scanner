import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.EXPO_PUBLIC_OPEN_AI_API_KEY,
})

const openai = new OpenAIApi(configuration)
// TODO: improve the prompt. it shd not rely on previous answers
const dishValidator = async (stringArray: string[]) => {
  const prompt = `here's an array of strings: ${stringArray}. based on your knowledge, reply to me with an array of booleans which indicate whether the item in the string array is a food or dish. the boolean array must contain the same amount of items as the original string array`

  try {
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 2000, // 4000 much cuased error
    })

    /* Magic happening */
    const regex = /\[([^\]]*)\]/g
    const inputString = result.data.choices[0]?.message?.content
    if (inputString) {
      const match = regex.exec(inputString)
      if (match) {
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
