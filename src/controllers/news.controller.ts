// src/controllers/news.controller.ts
import type { Request, Response } from 'express';
import * as newsService from '../services/news.service';
import type { News } from '../models/news.model';

// Get all news
export const getAllNews = async (_req: Request, res: Response) => {
  try {
    const news = await newsService.getAllNewsService();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get news by ID
export const getNewsById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id ?? '');
    const news = await newsService.getNewsByIdService(id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create news
export const createNews = async (req: Request, res: Response) => {
  try {
    const news: News = req.body;
    const created = await newsService.createNewsService(news);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update news
export const updateNews = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id ?? '');
    const updated = await newsService.updateNewsService(id, req.body);
    if (!updated) return res.status(404).json({ message: 'News not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete news
export const deleteNews = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id ?? '');
    const deleted = await newsService.deleteNewsService(id);
    if (!deleted) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
