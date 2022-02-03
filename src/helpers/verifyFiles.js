export const verifyFiles = (file, validExtensions) => {
    const cutFile = file.name.split('.')
    const extension = cutFile[cutFile.length - 1]
    if (!validExtensions.includes(extension)) {
        return false
    }
    return true
}
