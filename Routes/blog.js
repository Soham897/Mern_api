import { Router } from "express";
import express from 'express';
import { addBlog, allblogs, blogbyid, deleteBlog, myBlog, updateBlog } from "../Controllers/blog.js";
import { isauthenticate } from "../middlewares/Auth.js";

const router = Router();

router.post('/new',isauthenticate,addBlog);
router.get('/myblog',isauthenticate,myBlog);
router.put('/updateblog/:id',isauthenticate,updateBlog);
router.delete('/deleteblog/:id',isauthenticate,deleteBlog);
router.get('/allblogs',allblogs);
router.get('/blogbyid/:id',blogbyid);

export default router;