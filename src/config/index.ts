
   const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    tokenName: 'token',
    roles: {
        SuperAdmin:"SuperAdmin",
        Admin:"Admin",
        Employee:"Employee"
    },
    paging: {
      perPage: 25,
    },
    gender: {
      male: 'MALE',
      female: 'FEMALE',
      other: 'OTHER',
    },
  };
  
  export default config;