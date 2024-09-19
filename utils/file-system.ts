import {
  moveAsync,
  documentDirectory,
  deleteAsync,
  getInfoAsync,
  makeDirectoryAsync,
} from 'expo-file-system'

const targetDirectory = documentDirectory + 'photos'

export const saveImageToDocumentDirectory = async (
  cacheDirUri: string,
  filename: string
) => {
  if (!documentDirectory) {
    throw new Error()
  }

  try {
    const dirInfo = await getInfoAsync(targetDirectory)
    if (!dirInfo.exists) {
      await makeDirectoryAsync(targetDirectory, { intermediates: true })
    }
    const documentDirUri = targetDirectory + `/${filename}`
    await moveAsync({ from: cacheDirUri, to: documentDirUri })
    const photoFilePath = `photos/${filename}`
    return photoFilePath
  } catch (e) {
    throw new Error()
  }
}

export const deleteImageFromDocumentDirectory = async (filePath: string) => {
  await deleteAsync(documentDirectory + filePath, { idempotent: true })
}
