'use strict'

const test = require('ava')
const r = require('rethinkdb')
const uuid = require('uuid-base62')
const DB = require('../')
const fixtures = require('./fixtures')

const dbName = `emagram_${uuid.v4()}`
const db = new DB({ db: dbName })

test.before('setup database', async t => {
  await db.connect()
  t.true(db.connected, 'should be connected')
})

test.after('disconnect database', async t => {
  await db.disconnect()
  t.false(db.connected, 'should be disconnected')
})

test.after.always('cleanup database', async t => {
  let conn = await r.connect({})
  await r.dbDrop(dbName).run(conn)
})

test('save image', async t => {
  t.is(typeof db.saveImage, 'function', 'saveImage is a function')

  let image = fixtures.getImage()

  let created = await db.saveImage(image)
  t.is(created.description, image.description)
  t.is(created.url, image.url)
  t.is(created.likes, image.likes)
  t.is(created.liked, image.liked)
  t.is(created.user_id, image.user_id)

  t.deepEqual(created.tags, ['awesome', 'tags', 'emagram'])
  t.is(created.public_id, uuid.encode(created.id))
  t.is(typeof created.id, 'string')
  t.truthy(created.createdAt)
})

test('like image', async t => {
  t.is(typeof db.likeImage, 'function', 'likeImage is a function')

  let image = fixtures.getImage()
  let created = await db.saveImage(image)
  let result = await db.likeImage(created.public_id)

  t.true(result.liked)
  t.is(result.likes, image.likes + 1)
})

test('get image', async t => {
  t.is(typeof db.getImage, 'function', 'getImage is a function')

  let image = fixtures.getImage()
  let created = await db.saveImage(image)
  let result = await db.getImage(created.public_id)

  t.deepEqual(created, result)
})
