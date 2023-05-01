export type TPostVideo = {
    title?: string | number
    content : string | number
    tags?: string[]
    videFile?: File
    videoCover?: File
    selectedThumbnail?: File
    isSentive?: string
    mimeType? : string
    sizeInBytes? : number
    external_urls?: string []
    videoThumbnails?: []

}