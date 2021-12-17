import { initAuth0 } from '@auth0/nextjs-auth0';

const auth0 = initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid profile',
  audience: process.env.AUTH0_AUDIENCE,
  redirectUri: process.env.AUTH0_REDIRECT_URI,
  postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    storeAccessToken: true,
  },
});

// export const authorizeUser = (req, res) => {

// };

export default auth0;

export const withAuth = getProps => (roles, all = false) => async ({
  req,
  res,
}) => {
  const session = await auth0.getSession(req);
  const isAuthorized =
    session && session.user && checkIsAuthorized(session.user, roles, all);
  if (!isAuthorized) {
    res.writeHead(302, {
      Location: '/api/v1/login',
    });
    res.end();

    return { props: {} };
  }

  const data = getProps ? await getProps({ req, res }, session.user) : {};

  return { props: { user: session.user, ...data } };
};

export const checkIsAuthorized = (data, roles, all) => {
  if (!roles) return true;
  if (all)
    return roles.every(role =>
      data['http://next-portfolio-andrew' + '/roles'].includes(role)
    );

  return roles.some(role =>
    data['http://next-portfolio-andrew' + '/roles'].includes(role)
  );
};
