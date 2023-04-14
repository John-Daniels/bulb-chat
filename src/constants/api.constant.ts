import Config from "../config/config"

export const API_HOST = Config.API_URL || 'http://localhost:5000/'

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