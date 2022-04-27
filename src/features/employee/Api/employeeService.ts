import Http from 'lib/Http';

const http = new Http();

export default class EmployeeService {
    static listAll() {
        return http.get<any>({
            endpoint: '/employee',
        });
    }

    static create(args:any){
        return http.post<any>({
            endpoint:"/company",
            payload:args
        })
    }
}