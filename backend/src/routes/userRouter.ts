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

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
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
router.use(restrictTo('admin'));

router.route('/').post(createUser).get(getAllUsers);

router.route('/:userId').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
