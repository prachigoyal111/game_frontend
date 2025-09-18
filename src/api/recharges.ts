import client from './client';

export const getRecharges = () => client.get('/recharges');
export const getRecharge = (id: string) => client.get(`/recharges/${id}`);
export const createRecharge = (data: { memberId: string; amount: number; dateTime?: string }) => client.post('/recharges', data);
export const updateRecharge = (id: string, data: { memberId: string; amount: number; dateTime?: string }) => client.put(`/recharges/${id}`, data);
export const deleteRecharge = (id: string) => client.delete(`/recharges/${id}`);
