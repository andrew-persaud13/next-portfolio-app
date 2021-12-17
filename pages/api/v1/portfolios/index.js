import auth0 from '@/utils/auth0';

import PortfolioApi from '@/lib/api/portfolios';

export default async function (req, res) {
  try {
    const { accessToken } = await auth0.getSession(req);
    const result = await new PortfolioApi(accessToken).create(req.body);
    const portfolio = result.data;

    res.json(portfolio);
  } catch (err) {
    return res.status(err.status || 422).json(err.response.data);
  }
}
