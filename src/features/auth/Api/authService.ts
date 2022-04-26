import Http from 'lib/Http';
import {ILogin} from "../types/IAuth"

const http = new Http();

export default class AuthService {
    static login(args:ILogin) {
        return http.post<any>({
            endpoint: '/auth/login',
            payload:args
        });
    }

    static getCurrentUser(){
        return http.get<any>({
            endpoint:"/auth/me"
        })
    }

}