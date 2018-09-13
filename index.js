require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const HashIds = require('hashids')

const config = {
  port: process.env.PORT
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/generate-score', (req, res) => {
  try {
    const { gameSessionId, score, hit, successHit } = req.body

    if (!gameSessionId) {
      throw new Error('gameSessionId is missing')
    } else if (!score) {
      throw new Error('score is missing')
    } else if (!hit) {
      throw new Error('hit is missing')
    } else if (!successHit) {
      throw new Error('successHit is missing')
    }

    const hashIds = new HashIds(gameSessionId, 15)
    const encodeScores = `${hashIds.encode(score)}_${hashIds.encode(hit)}_${hashIds.encode(successHit)}`

    res.send({
      score: encodeScores
    })
  } catch (e) {
    res.status(400).send({
      error: e.message
    })
  }
})

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))
