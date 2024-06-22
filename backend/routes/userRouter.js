import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);

router.route('/:userId').patch(updateUser).delete(deleteUser);

export default router;
