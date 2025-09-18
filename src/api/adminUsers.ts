import client from './client';

export const getAdminUsers = () => client.get('/admin_users');
export const getAdminUser = (id: string) => client.get(`/admin_users/${id}`);
export const createAdminUser = (data: { username: string; password: string }) => client.post('/admin_users', data);
export const updateAdminUser = (id: string, data: { username: string; password: string }) => client.put(`/admin_users/${id}`, data);
export const deleteAdminUser = (id: string) => client.delete(`/admin_users/${id}`);
