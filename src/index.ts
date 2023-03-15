import * as dotenv from 'dotenv'
import app from './server'

const port = 3001
app.listen(port, () => {
  console.log(`hello on http://localhost:${port}`)
})