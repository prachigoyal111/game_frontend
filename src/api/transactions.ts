import client from './client';

export const getTransactions = () => client.get('/transactions');
export const getTransaction = (id: string) => client.get(`/transactions/${id}`);
export const createTransaction = (data: { memberId: string; gameId: string; dateTime?: string }) => client.post('/transactions', data);
export const updateTransaction = (id: string, data: { memberId: string; gameId: string; dateTime?: string }) => client.put(`/transactions/${id}`, data);
export const deleteTransaction = (id: string) => client.delete(`/transactions/${id}`);
