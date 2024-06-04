import express from "express";
import {
    getUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";

import { 
    getAduan, 
    getAduanById, 
    createAduan, 
    updateAduan, 
    deleteAduan 
} from "../controllers/AduanController.js";

import { 
    getBerita, 
    getBeritaById, 
    createBerita, 
    updateBerita, 
    deleteBerita 
} from "../controllers/BeritaController.js";

const router = express.Router();

router.get('/users',getUsers);
router.get('/users/:id',getUserById);
router.post('/users',createUser);
router.patch('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

router.get('/aduan/:status',getAduan);
router.get('/aduan/:id',getAduanById);
router.post('/aduan',createAduan);
router.patch('/aduan/:id',updateAduan);
router.delete('/aduan/:id',deleteAduan);

router.get('/berita',getBerita);
router.get('/berita/:id',getBeritaById);
router.post('/berita',createBerita);
router.patch('/berita/:id',updateBerita);
router.delete('/berita/:id',deleteBerita);

export default router;