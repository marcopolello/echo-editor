import { icons } from '@/components/icons'

interface ServiceType {
  label: string
  value: string
  icon: keyof typeof icons
}
export const VideoServices: ServiceType[] = [
  {label: 'Youtube', value: 'youtube', icon: 'Youtube'},
  //{ label: 'Youku', value: 'youku', icon: 'Youku' },
  //{
  //  label: 'bilibili',
  //  value: 'bilibili',
  //  icon: 'BiliBili',
  //},
  //{
  //  label: 'qqvideo',
  //  value: 'qqvideo',
  //  icon: 'QQVideo',
  //},
]

export const MapServices: ServiceType[] = [
  //{ label: 'amap', value: 'amap', icon: 'Gaode' },
  //{ label: 'baidu_map', value: 'baidu_map', icon: 'Baidu' },
]

export const DesignServices: ServiceType[] = [
  //{ label: 'modao', value: 'modao', icon: 'Modao' },
  //{ label: 'lanhu', value: 'lanhu', icon: 'Lanhu' },
  { label: 'Figma', value: 'figma', icon: 'Figma' },
  { label: 'Canva', value: 'canva', icon: 'Canva' },
  //{ label: 'ProcessOn', value: 'processon', icon: 'Processon' },
]

export const DevelopServices: ServiceType[] = [{ label: 'CodePen', value: 'codepen', icon: 'Codepen' }]

//export const DataServices: ServiceType[] = [{ label: 'jinshuju', value: 'jinshuju', icon: 'Jinshuju' }]

export const OtherServices = []

export const AllEmbedServices = [
  ...VideoServices,
  ...MapServices,
  ...DesignServices,
  ...DevelopServices,
  //...DataServices,
  ...OtherServices,
]

export const getEmbedService = value => {
  for (var item of AllEmbedServices) {
    if (item.value === value) {
      return item
    }
  }

  return {}
}

/**
 * Embed service link
 * @id source id
 * @example example link
 * @src source src, used in iframe
 */
export const EmbedServiceLink = {
  youtube: {
    example: 'https://www.youtube.com/watch?v=I4sMhHbHYXM',
    src: 'https://www.youtube.com/embed/I4sMhHbHYXM',
    srcPrefix: 'https://www.youtube.com/embed',
    linkRule: ['www.youtube.com\\/watch\\?v=\\w+'],
  },
  figma: {
    example: 'https://www.figma.com/board/xxLy0FR1SHLUI09xsZjNtL/Untitled?node-id=0-1',
    src: 'https://www.figma.com/board/xxLy0FR1SHLUI09xsZjNtL/Untitled?node-id=0-1',
    srcPrefix: 'https://www.figma.com/embed?embed_host=share&url',
    linkRule: ['https:\\/\\/www.figma.com\\/board\\/\\w+'],
  },
  canva: {
    example: 'https://www.canva.com/design/DAGClhJdc3A/gAtQOzE3NakFo_p_jf9OuQ/view',
    src: 'https://www.canva.com/design/DAGClhJdc3A/gAtQOzE3NakFo_p_jf9OuQ/view',
    srcPrefix: '',
    linkRule: ['https:\\/\\/www.canva.com\\/design\\/.+\\/view'],
  },
  codepen: {
    example: 'https://codepen.io/mekery/embed/YzyrKOJ',
    src: 'https://codepen.io/mekery/embed/YzyrKOJ',
    srcPrefix: '',
    linkRule: ['https:\\/\\/codepen.io\\/.+\\/embed\\/\\w+'],
  },
}

function getYoutubeSrc(originalLink, result) {
  let link = EmbedServiceLink.youtube
  let url = result.matchedUrl
  result.validLink = true

  let splits = url.split('=')
  let len = splits.length
  if (len > 0) {
    let id = splits[len - 1]
    result.src = `${link.srcPrefix}/${id}`
    result.validId = true
  }

  return result
}

function getAMapSrc(originalLink, result) {
  result.src = originalLink
  result.validId = true

  return result
}

function getBaiduMapSrc(originalLink, result) {
  result.src = originalLink
  result.validId = true

  return result
}

function getGoogleMapSrc(originalLink, result) {
  result.src = result.matchedUrl
  result.validId = true
  result.originalLink = result.src

  return result
}

function getFigmaSrc(originalLink, result) {
  let link = EmbedServiceLink.figma
  result.src = `${link.srcPrefix}=${encodeURIComponent(result.matchedUrl)}`
  result.validId = true
  result.originalLink = result.matchedUrl

  return result
}

function getCanvaSrc(originalLink, result) {
  result.src = `${result.matchedUrl}?embed`
  result.validId = true
  result.originalLink = originalLink

  return result
}

function getCodepenSrc(originalLink, result) {
  result.src = `${result.matchedUrl}`
  result.validId = true
  result.originalLink = result.src

  return result
}

function getJinshujuSrc(originalLink, result) {
  result.src = `${result.matchedUrl}?background=white&banner=show&embedded=true`
  result.validId = true
  result.originalLink = originalLink

  return result
}

function getCommonSrc(originalLink, result) {
  result.src = `${result.matchedUrl}`
  result.validId = true
  result.originalLink = originalLink

  return result
}

function getMatchedUrl(service, originalLink, result) {
  let link = EmbedServiceLink[service]
  let linkRule = link.linkRule

  for (var rule of linkRule) {
    let regex = new RegExp(rule)
    let match = originalLink.match(regex)
    if (match && match.length > 0) {
      result.validLink = true
      result.matchedUrl = match[0]

      return result
    }
  }

  return result
}

export function getExampleUrl(service: string) {
  let exampleUrl = ''
  let link = EmbedServiceLink[service]
  if (link) {
    exampleUrl = link.example
  }
  return exampleUrl
}

export const getServiceSrc = (service, originalLink) => {
  let result = {
    validLink: false,
    validId: false,
    matchedUrl: '',
    originalLink: originalLink,
    src: '',
  }

  // matched url
  result = getMatchedUrl(service, originalLink, result)
  if (!result.validLink) {
    return result
  }

  // src
  switch (service) {
    case 'youtube':
      return getYoutubeSrc(originalLink, result)
    case 'google_map':
      return getGoogleMapSrc(originalLink, result)
    case 'figma':
      return getFigmaSrc(originalLink, result)
    case 'canva':
      return getCanvaSrc(originalLink, result)
    case 'codepen':
      return getCodepenSrc(originalLink, result)
    case 'iframe':
      return getCommonSrc(originalLink, result)
  }

  return result
}
