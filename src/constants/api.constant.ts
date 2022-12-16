export const API_HOST = process.env.REACT_APP_API_URL as string || 'http://localhost:5000/'

export enum API {
        signup = '/users/signup',
        login = '/users/login',
        avater = '/users/avater',
        profile = '/users/profile',
        allUsersRoute = '/users',
        sendMsg = '/messages/send',
        getUserMessages = '/messages',
}

export default API