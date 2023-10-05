import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const login = (payload: any) => sendPost('/API/API.php', payload);
export const signUp = (payload: any) => sendPost('/API/API.php', payload);
