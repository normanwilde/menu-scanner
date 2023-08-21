import { IMenuPage, IMenuPageSection } from '../typings/data'

export const groupMenuPages = (data: IMenuPage[]): IMenuPageSection[] => {
  const sectionObject = data.reduce(
    (
      sectionObject: Record<string, IMenuPage[]>,
      menuPage: IMenuPage
    ): Record<string, IMenuPage[]> => {
      const itemTimestamp = new Date(menuPage.timestamp)
      const itemDate = new Date(
        itemTimestamp.getFullYear(),
        itemTimestamp.getMonth(),
        itemTimestamp.getDate()
      ).getTime()

      if (!sectionObject[itemDate]) {
        sectionObject[itemDate] = []
      }

      sectionObject[itemDate] = [...sectionObject[itemDate], menuPage]
      return sectionObject
    },
    {}
  )

  return Object.entries(sectionObject).map(([key, value]) => ({
    title: key,
    data: value,
  }))
}
