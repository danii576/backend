// src/routes/news.routes.ts
import { Router } from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/news.controller';

const router = Router();

router.get('/', getAllNews);         // ← changed from '/news' to '/'
router.get('/:id', getNewsById);     // ← changed from '/news/:id'
router.post('/', createNews);        // ← changed from '/news'
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;
