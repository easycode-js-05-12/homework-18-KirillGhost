import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class UserService {
    /**
     * @desc Returns user with current id
     * @param {string} id - User id
     * @returns {Promise} Promise object
     */
    getUser(id) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/users/get-info/${id}`)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}