const conf = {
  apiUrlPrefix: 'http://localhost:1337/api',
  urlPrefix: 'http://localhost:1337',
  loginEndpoint: '/auth/local',
  registerEndpoint: '/auth/local/register',
  jwtUserEndpoint: '/members/profile',
  jwtSessionStorageKey: 'auth.jwt',
}

export default conf;