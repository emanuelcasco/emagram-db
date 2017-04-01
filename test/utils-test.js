'use strict'

const test = require('ava')
const utils = require('../lib/utils')

test('this should pass', t => {
  t.pass()
})

test('extracting hashtags from text', t => {
  let tags = utils.extractTags('a #picture with tags #AwEsOmE #PlAtZi #AVA #100 ##yes')
  t.deepEqual(tags, [
    'picture',
    'awesome',
    'platzi',
    'ava',
    '100',
    'yes'
  ])

  tags = utils.extractTags('a picture with no tags')
  t.deepEqual(tags, [])

  tags = utils.extractTags(null)
  t.deepEqual(tags, [])
})
