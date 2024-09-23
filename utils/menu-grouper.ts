import { IMenuPage, IMenuPages, IMenuPageSection } from '../typings/data'

export const groupMenuPages = (data: IMenuPages): IMenuPageSection[] => {
  const sectionObject = Object.values(data)
    .sort((a, b) => b.timestamp - a.timestamp)
    .reduce(
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
