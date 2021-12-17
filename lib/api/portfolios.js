import BaseApi from './BaseApi';

class PortfolioApi extends BaseApi {
  constructor(accessToken) {
    super(accessToken, '/portfolios');
  }
}

export default PortfolioApi;
