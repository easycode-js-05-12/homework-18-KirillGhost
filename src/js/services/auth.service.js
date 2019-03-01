import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class AuthService {
    /**
     * @desc Gets current user token
     * @returns {string} Token
     */
    get token() {
        return localStorage.getItem('sn_user_token');
    }

    /**
     * @desc Gets current user id
     * @returns {string} Id
     */    
    get userId() {
        return localStorage.getItem('sn_user_id');
    }

    /**
     * @desc Returns promise after user login
     * @param {string} email - User email 
     * @param {string} password - User password
     * @returns {Promise} Promise object
     */    
    login(email, password) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/login`, {email, password})
                .then((response) => {
                    if (!response.auth) return reject(response); 
                    localStorage.setItem('sn_user_id', response.id);
                    localStorage.setItem('sn_user_token', response.token);
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }

    /**
     * @desc Returns promise after user signup
     * @param {object} userData - Information about current user
     * @returns {Promise} Promise object
     */        
    signup(userData) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/signup`, userData)
                .then((response) => {
                    if (!response.auth) return reject(response); 
                    localStorage.setItem('sn_user_id', response.id);
                    localStorage.setItem('sn_user_token', response.token);
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}