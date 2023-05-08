import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import { loginValidation, postCreateValidation, registerValidation } from './validation.js'

import chekAuth from './utils/chekAuth.js'
import { login, register, getMe } from './controllers/userControllers.js'
import { create, getAll, getLastTags, getOne, remove, update } from './controllers/PostController.js'
import handleValidationError from './utils/handleValidationError.js'


mongoose.connect('mongodb+srv://Oleksii:VO4IvtGDpYVpBd6C@cluster0.fa8qg7i.mongodb.net/test').
    then(() => console.log('DB ok')).
    catch((e) => console.log('DB error', e))

const app = express()
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

const PORT = 3001

app.post('/auth/register', registerValidation, /* handleValidationError, */ register)
app.post('/auth/login', loginValidation, /* handleValidationError, */ login)
app.get('/auth/me', chekAuth, getMe)

app.post('/upload', chekAuth, upload.single('image'), (req, res) => {

    res.json({ url: `/uploads/${req.file.originalname}` })
})

app.get('/posts', /* chekAuth, */ getAll)
app.get('/tags', getLastTags)
app.get('/posts/:id', chekAuth, getOne)
app.post('/posts', chekAuth, postCreateValidation, /* handleValidationError, */ create)
app.delete('/posts/:id', chekAuth, remove)
app.patch('/posts/:id', postCreateValidation, chekAuth, /* handleValidationError, */ update)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 
