import express from 'express';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import {registerValidation, loginValidation, postCreateValidation, commentValidation} from './validations.js';

import {checkAuth, handleValidationErrors} from "./utils/index.js";

import {UserController, PostController, CommentController} from "./controllers/index.js";

mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_,file, cb) => {
        cb(null, 
            file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors({
    origin: 
    process.env.CORS_ORIGIN2
    || "http://localhost:3000",
  }));


app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/posts/:postId/comment',checkAuth, commentValidation, CommentController.create )

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: 'https://api.cloudinary.com/v1_1/romaniuk-blog/image/upload'
    })
})

app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(process.env.PORT || 4444, (err) => {
    if(err) {
        console.log(err)
    }

    console.log('Server OK')
})


