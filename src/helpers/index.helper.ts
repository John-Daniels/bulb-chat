export const loadBase64Img = (img: string) => `data:image/svg+xml;base64,${img}`

export const getUserRoom = (users: string[]) => users.sort().join("_");
