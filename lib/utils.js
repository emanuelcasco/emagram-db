'use strict'

const crypto = require('crypto')

const utils = {
  extractTags,
  encrypt
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

function encrypt (password) {
  let shasum = crypto.createHash('sha256')
  shasum.update(password)

  return shasum.digest('hex')
}

module.exports = utils
