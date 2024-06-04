import express from "express";
import {
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";

import { getAduan } from "../controllers/AduanController.js";

const router = express.Router();

router.get('/users',getUsers);
router.get('/users/:id',getUserById);
router.post('/users',createUser);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

router.get('/aduan/:status',getAduan);

export default router;