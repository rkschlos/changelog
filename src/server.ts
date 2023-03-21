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

//handlers can use next in a handler!
app.get('/', (req, res, next) => {
    res.json({message: 'hello'})
})

//use is not http - but allows you to 
//apply global function 
//makes path url/api/product:id
app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

//has to come after routes so can catch error
//only synchronous errors
app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({message: 'unauthorized'})
    } else if (err.type === "input") {
        res.status(400).json({message: 'invalid input'})
    } else {
        res.status(500).json({message: 'oops, that is on us'})
    }
})

export default app 