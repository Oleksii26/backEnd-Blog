import express from 'express'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import fileUpload from 'express-fileupload'
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

app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 150 * 120 }
}))

cloudinary.config({
    cloud_name: "dtcpohmvh",
    api_key: "416256211882687",
    api_secret: "FMJlCXclATSnH1Anzi82ByFIRSg"
});


const PORT = 3001

app.post('/auth/register', registerValidation, /* handleValidationError, */ register)
app.post('/auth/login', loginValidation, /* handleValidationError, */ login)
app.get('/auth/me', chekAuth, getMe)


app.post('/uploads', chekAuth, async (req, res) => {
    const file = req.files.image
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        public_id: `${Date.now}`,
        resource_type: 'auto',
        folder: 'uploads'
    })
    res.json({result})
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
