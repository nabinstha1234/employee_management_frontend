import Http from 'lib/Http';

const http = new Http();

export default class CompanyService {
    static listAll() {
        return http.get<any>({
            endpoint: '/company',
        });
    }

    static create(args:any){
        return http.post<any>({
            endpoint:"/company",
            payload:args
        })
    }
}