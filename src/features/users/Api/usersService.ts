import Http from 'lib/Http';

const http = new Http();

export default class UsersService {
    static listAll() {
        return http.get<any>({
            endpoint: '/users',
        });
    }

    static create(args:any){
        return http.post<any>({
            endpoint:"/users/create",
            payload:args
        })
    }
}