import express from 'express'
import router from './router'
import morgan from 'morgan'

const app = express()

//order matters! middleware before routes
app.use(morgan('dev'))

app.get('/', (req, res) => {
    console.log('hello from express')
    res.status(200)
    res.json({message: 'hello'})
})

//use is not http - but allows you to 
//apply global function 
//makes path url/api/product:id
app.use('/api', router)

export default app 