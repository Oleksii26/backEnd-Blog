import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'emIL IS FaIL').isEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),
]
export const registerValidation = [
    body('email', 'emIL IS FaIL').isEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),
]
export const postCreateValidation = [
    body('title', 'Created title of post').isLength({min: 3}).isString(),
    body('text', 'Created title of post').isLength({min: 10}).isString(),
    body('tags', 'Format tags is wrong').optional().isString(),
    body('imageUrl', 'Link of image is wrong').optional().isString(),
   
]