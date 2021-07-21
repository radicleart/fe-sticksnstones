/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
  if (doc.type === 'homepage') {
    return '/'
  }
  if (doc.type === 'about') {
    return '/about'
  }
  if (doc.uid) {
    return '/' + doc.uid
  }
  if (doc.isBroken) {
    return '/not-found'
  }
  return '/404'
}
