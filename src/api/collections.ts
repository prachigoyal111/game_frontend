import client from './client';

export const getCollections = () => client.get('/collections');
export const getCollection = (id: string) => client.get(`/collections/${id}`);
export const createCollection = (data: { date: string; amount: number }) => client.post('/collections', data);
export const updateCollection = (id: string, data: { date: string; amount: number }) => client.put(`/collections/${id}`, data);
export const deleteCollection = (id: string) => client.delete(`/collections/${id}`);
export const getDailyTotal = (date: string) => client.get(`/collections/day/${date}`);
