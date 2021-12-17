import auth0 from '@/utils/auth0';

export default async (req, res) => {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' });
  } catch (err) {
    res.status(err.status || 400).end(err.message);
  }
};
