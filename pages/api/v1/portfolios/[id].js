import auth0 from '@/utils/auth0';

import PortfolioApi from '@/lib/api/portfolios';

export default async function (req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    return getById(id, res);
  }

  if (req.method === 'PATCH') {
    const { accessToken } = await auth0.getSession(req);
    return updatePortfolio(id, req.body, accessToken, res);
  }

  if (req.method === 'DELETE') {
    const { accessToken } = await auth0.getSession(req);
    return deletePortfolio(id, accessToken, res);
  }
}

const getById = async (id, res) => {
  try {
    const result = await new PortfolioApi().getById(id);
    const portfolio = result.data;

    return res.json(portfolio);
  } catch (err) {
    return res.status(err.status || 422).json(err.response.data);
  }
};

const updatePortfolio = async (id, data, token, res) => {
  try {
    const result = await new PortfolioApi(token).update(id, data);
    const portfolio = result.data;
    return res.json(portfolio);
  } catch (err) {
    return res.status(err.status || 422).json(err.response.data);
  }
};

const deletePortfolio = async (id, token, res) => {
  try {
    const result = await new PortfolioApi(token).delete(id);
    const portfolio = result.data;
    return res.json(portfolio);
  } catch (err) {
    return res.status(err.status || 422).json(err.response.data);
  }
};
