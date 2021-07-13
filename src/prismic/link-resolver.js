/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
  if (doc.type === 'homepage') {
    return '/'
  }

  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'ruma_content' | 'ruma_vertical_block') {
    return '/community/' + doc.uid
  }

  if (doc.type === 'ruma_content' | 'ruma_vertical_block') {
    return '/nft/' + doc.uid
  }

  if (doc.type === 'post') {
    return '/blog/' + doc.uid
  }

  if (doc.type === 'page') {
    return '/page/' + doc.uid
  }

  return '/404'
}
