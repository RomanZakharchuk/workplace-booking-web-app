const baseURL = process.env.REACT_APP_BASE_URL;

const urls = {
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    submitPassword: '/auth/forgot-password/submit',
    signUp: '/auth/sign-up',
    signUpSubmit: '/auth/sign-up/submit',
    usersProfile: '/users/profile',
    offices: '/offices',
    users: '/users',
    usersImport: '/users/import',
    usersExport: '/users/export',
    companies: '/companies',
    rooms: '/rooms',
    bookings: '/bookings'
}

export {
    baseURL,
    urls
}