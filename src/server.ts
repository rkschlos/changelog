import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

//order matters! middleware before routes
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use((req, res, next) => {
    req.shhhh_secret = 'doggy'
    next()
})

app.get('/', (req, res) => {
    console.log('hello from express')
    res.status(200)
    res.json({message: 'hello'})
})

//use is not http - but allows you to 
//apply global function 
//makes path url/api/product:id
app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

export default app 