const conf = {
  urlPrefix: 'http://localhost:1337',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/auth/local/register',
  jwtUserEndpoint: '/members/profile',
  jwtSessionStorageKey: 'auth.jwt',
}

export default conf;