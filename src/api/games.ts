import client from './client';

export const getGames = () => client.get('/games');
export const getGame = (id: string) => client.get(`/games/${id}`);
export const createGame = (data: { name: string; price: number; description?: string }) => client.post('/games', data);
export const updateGame = (id: string, data: { name: string; price: number; description?: string }) => client.put(`/games/${id}`, data);
export const deleteGame = (id: string) => client.delete(`/games/${id}`);
