'use strict'

const utils = {
  extractTags
}

function extractTags (text) {
  if (text == null) return []

  let matches = text.match(/#(\w+)/g)

  if (matches === null) return []

  matches = matches.map(normalize)

  return matches
}

function normalize (text) {
  return text.toLowerCase()
             .replace(/#/g, '')
}

module.exports = utils
