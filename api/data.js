const express = require('express')
const bodyParser = require('body-parser')
const MyHabeetat = require('myhabeetat')

const app = express()
app.use(bodyParser.json())

app.get('*', (req, res) => {
  res.json({ status: 'ok', date: new Date().toISOString() })
})

app.post('*', async (req, res) => {
  try {
    let token = await MyHabeetat.login(req.body.email, req.body.password)
    let homes = await MyHabeetat.getHomes(token)
    
    let devices = []
    for (const home of homes) {
      devices.push(...await MyHabeetat.getDevices(token, home))
    }

    res.json({ status: 'ok', token: token, homes: homes, devices: devices })
  } catch (error) {
    res.json({ status: 'error', message: error.message })
  }
})

module.exports = app
