import { initDB, RowDataPacket, ResultSetHeader } from "../config/db";
import type { News } from "../models/news.model";

// Get all news
export const getAllNewsService = async (): Promise<News[]> => {
  const db = await initDB();
  const [rows] = await db.query<RowDataPacket[]>(
    'SELECT * FROM news ORDER BY created_at DESC'
  );
  return rows as News[];
};

// Get news by ID
export const getNewsByIdService = async (id: number): Promise<News | null> => {
  const db = await initDB();
  const [rows] = await db.query<RowDataPacket[]>(
    'SELECT * FROM news WHERE id = ?',
    [id]
  );
  return (rows as News[])[0] || null;
};

// Create news
export const createNewsService = async (news: News): Promise<News> => {
  const db = await initDB();
  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO news (title, content, image_url, file_url, admin_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
    [news.title, news.content, news.image_url || null, news.file_url || null, news.admin_id]
  );
  const insertId = result.insertId;
  return { ...news, id: insertId, created_at: new Date(), updated_at: new Date() };
};

// Update news
export const updateNewsService = async (id: number, news: Partial<News>): Promise<News | null> => {
  const db = await initDB();
  await db.query<ResultSetHeader>(
    'UPDATE news SET title=?, content=?, image_url=?, file_url=?, updated_at=NOW() WHERE id=?',
    [news.title, news.content, news.image_url || null, news.file_url || null, id]
  );
  return getNewsByIdService(id); // now this works because the function is defined above
};

// Delete news
export const deleteNewsService = async (id: number): Promise<boolean> => {
  const db = await initDB();
  const [result] = await db.query<ResultSetHeader>(
    'DELETE FROM news WHERE id=?',
    [id]
  );
  return result.affectedRows > 0;
};
