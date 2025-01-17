import { File } from './types/file'
import { PlayQueueItem, PlayQueueStatus } from './types/playQueue'

/**
 * 将时间转换为分钟
 * @param time 
 * @returns 
 */
export const timeShift = (time: number) => {
  const minute = Math.floor(time / 60).toFixed().toString().padStart(2, '0')
  const second = (time % 60).toFixed().toString().padStart(2, '0')
  return `${minute} : ${second}`
}

const isAudio = (name: string) => (/.(wav|mp3|aac|ogg|flac|m4a|opus)$/i).test(name)
const isVideo = (name: string) => (/.(mp4|mkv|avi|mov|rmvb|webm|flv)$/i).test(name)
const isPicture = (name: string) => (/.(jpg|jpeg|png|bmp|webp|avif|tiff|gif|svg|ico)$/i.test(name))

export const checkFileType = (name: string): File['fileType'] => {
  if (isAudio(name))
    return 'audio'
  if (isVideo(name))
    return 'video'
  if (isPicture(name))
    return 'picture'
  return 'other'
}

/**
 * 创建随机播放队列，如果传入当前播放id时歌曲会排到第一
 * @param playQueue 播放队列
 * @param currentIndex 当前播放id
 * @returns 
 */
export const shufflePlayQueue = (playQueue: PlayQueueItem[], currentIndex?: PlayQueueStatus['currentIndex']) => {
  const randomPlayQueue = [...playQueue]
  for (let i = randomPlayQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomPlayQueue[i], randomPlayQueue[j]] = [randomPlayQueue[j], randomPlayQueue[i]]
  }
  if (currentIndex)
    return randomPlayQueue.filter(item => item.index === currentIndex).concat(randomPlayQueue.filter(item => item.index !== currentIndex))
  else return randomPlayQueue
}

export const nowTime = () => {
  const dateTime = new Date()
  return `${dateTime.getFullYear}-${dateTime.getMonth}-${dateTime.getDay} ${dateTime.getHours}:${dateTime.getMinutes}`
}

export const fileSizeConvert = (fileSize: File['fileSize']) => {
  return ((fileSize / 1024) < 1024)
    ? `${(fileSize / 1024).toFixed(2)} KB`
    : ((fileSize / 1024 / 1024) < 1024)
      ? `${(fileSize / 1024 / 1024).toFixed(2)} MB`
      : `${(fileSize / 1024 / 1024 / 1024).toFixed(2)} GB`
}

export const filePathConvert = (filePath: File['filePath']) => (filePath.join('/') === '/') ? '/' : filePath.slice(1).join('/')