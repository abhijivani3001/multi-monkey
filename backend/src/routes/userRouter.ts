import express from 'express';
import {
  createUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updateUser,
  verifyEmail,
} from './../controllers/userController';
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updateMyPassword,
} from '../controllers/authController';
import { userRoles } from '../constants/roles.constant';

const router = express.Router();

router.post('/signup', signup);
router.get('/:userId/verify/:token', verifyEmail);
router.post('/login', login);
router.post('/googleLogin');
router.post('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// ----- Protect all routes after this middleware -----
router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updateMyPassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

// ----- Restrict all routes to admin after this middleware -----
router.use(restrictTo(userRoles.ADMIN));

router.route('/').post(createUser).get(getAllUsers);

router.route('/:userId').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
