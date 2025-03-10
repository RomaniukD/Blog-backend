import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат email').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат email').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('fullName', 'Имя должно быть указано').isLength({ min: 3 }),
  body('avatarUrl', 'Неверный URL аватара').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Введіть заголовок статї').isLength({min:3}).isString(),
  body('text', 'Введіть текст статті').isLength({ min: 3 }).isString(),
  body('tags', 'Неправильний формат тегів').optional().isString(),
  body('imageUrl', 'Не правильне посилання на зображення').optional().isString(),
];

export const commentValidation = [
  body('text', 'Коментар не може бути порожнім').isLength({min: 1}),
  // body('post', 'Виникла помилка при пошуку поста').isMongoId(),
  // body('user', 'Без реєстрації не можна створити коментар').isMongoId(),
]