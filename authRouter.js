const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

router.post(
	'/registration',
	[
		check('username', 'Имя пользователя не может быть пустым').notEmpty(),
		check('password', 'Длина пароля должна быть от 4 до 10 символов').isLength({
			min: 4,
			max: 10,
		}),
	],
	controller.registration
);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['USER']), controller.getUsers);

module.exports = router;
