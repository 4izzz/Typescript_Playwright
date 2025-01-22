import path from 'path'

export const globalState = {
    baseURL: '' as string, // Public constant for baseURL
    usersFilePath: path.resolve(__dirname, '../data/users.json') as string,
    contextsDir: path.resolve(__dirname, '../contexts') as string,
  };
  