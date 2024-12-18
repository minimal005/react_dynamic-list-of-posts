import { client } from '../utils/fetchClient';
import { User } from '../types/User';

const url = `/users`;

export const getUsers = () => {
  return client.get<User[]>(`${url}`);
};

export const createUser = (user: Omit<User, 'id'>) => {
  return client.post<User>(`${url}`, user);
};

export const editUser = (user: User) => {
  return client.patch<User>(`${url}/${user.id}`, user);
};

export const deleteUser = (userId: number) => {
  return client.delete(`${url}/${userId}`);
};
