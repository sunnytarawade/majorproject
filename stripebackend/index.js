const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const morgan = require('morgan')
const uuid = require('uuid')

mongoose.connect("mongodb+srv://admin:admin@cluster0.rbxbg.mongodb.net/onetimednsDB?retryWrites=true&w=majority",
  
     { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }
  );

  const app = express()

// const loginRouter = require('./src/routes/login.js')

const authRouter = require('./api/routes/auth')
const productRouter = require('./api/routes/products')
const dnsProfileVerificationRouter = require('./api/routes/dnsProfileVerificationRouter')


app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


app.get("/",(req,res)=>{
    res.send("It works")
})

app.use('/auth',authRouter)
app.use('/products',productRouter)
app.use('/dns-verify',dnsProfileVerificationRouter)

app.use((req,res,next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error: error.message
    })
})

app.get('dnslookup',(req,res)=>{
    res.json({
        dnsIp : '::ffff:192.168.0.8'
    })
})

let message = ''

app.post('/purchase',async (req,res,next)=>{

    next()

    const url = 'http://localhost:3001'
    const idempotencyKey = uuid.v4()

    const hashedKey = await bcrypt.hash(idempotencyKey,10)
    console.log(hashedKey,idempotencyKey)

    const uniqueURL = hashedKey + '.' + url



    res.status(201).json({"message" : message})
/* 
    bcrypt.hash(idempotencyKey,10).then(result=>{
        console.log(result.salt,result,idempotencyKey)

    })
 */


})


app.listen(3001,()=>{console.log("Listening at localhost:3001")})