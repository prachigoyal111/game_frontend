import client from './client';

export const getMembers = () => client.get('/members');
export const getMember = (id: string) => client.get(`/members/${id}`);
export const getMemberByPhone = (phone: string) => client.get(`/members/phone/${phone}`);
export const createMember = (data: { name: string; phone: string; balance?: number }) => client.post('/members', data);
export const updateMember = (id: string, data: { name: string; phone: string; balance?: number }) => client.put(`/members/${id}`, data);
export const deleteMember = (id: string) => client.delete(`/members/${id}`);
export const getMemberRecharges = (id: string) => client.get(`/members/${id}/recharges`);
export const getMemberTransactions = (id: string) => client.get(`/members/${id}/transactions`);
