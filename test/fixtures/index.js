'use strict'

const uuid = require('uuid-base62')

const fixtures = {
  getImage () {
    return {
      description: 'an #awesome picture with #tags #emagram',
      url: `https://platzigram.test/${uuid.v4()}.jpg`,
      likes: 0,
      liked: false,
      user_id: uuid.uuid()
    }
  },
  getImages (n) {
    let images = []
    while (n-- > 0) {
      images.push(this.getImage())
    }
    return images
  },
  getUser () {
    return {
      name: 'Random user',
      username: `user_${uuid.v4()}.jpg`,
      password: uuid.uuid(),
      email: `cascoemanuel+${uuid.v4()}@gmail.com`,
    }
  }
}

module.exports = fixtures
