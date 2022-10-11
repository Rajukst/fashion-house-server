const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Project Server is Running!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})