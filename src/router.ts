import { Router } from 'express';
import { body } from 'express-validator'
import {createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage} from './handlers';
import { handleInputErrors } from './middleware/validations';
import { authenticate } from './middleware/auth';
const router = Router();

router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle vacio'),
    body('name')
        .notEmpty()
        .withMessage('Nombre de usuario vacio'),
    body('email')
        .isEmail()
        .withMessage('Email no valido'),
    body('password')
        .isLength({min:8})
        .withMessage('Password es muy corto minimo 8 caracteres'),
        handleInputErrors,
        createAccount
);

router.post('/auth/login', 
    body('email')
        .isEmail()
        .withMessage('Email no valido'),
    body('password')
        .notEmpty()
        .withMessage('Password es necesario'),
        handleInputErrors,
        login
)

router.get('/user', authenticate,getUser);

router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El handle vacio'),
    
    handleInputErrors,
    authenticate, 
    updateProfile);

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search', 
    body('handle')
        .notEmpty()
        .withMessage('Handle no puede estar vacio'),
        handleInputErrors,
        searchByHandle
)
export default router;