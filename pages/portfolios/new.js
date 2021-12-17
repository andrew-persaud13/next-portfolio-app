import { Row, Col } from 'reactstrap';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

import PortfolioForm from '@/components/PortfolioForm';
import Redirect from '@/components/shared/Redirect';

import { useCreatePortfolio } from '@/actions/portfolios';

import withAuth from '@/hoc/withAuth';

const CreatePortfolio = ({ data: user, loading: loadingUser }) => {
  const [
    createPortfolio,
    { data: newPortfolio, loading: loadingCreate, error },
  ] = useCreatePortfolio();

  if (newPortfolio) return <Redirect to='/portfolios' />;
  return (
    <BaseLayout user={user} loading={loadingUser}>
      <BasePage header='Create Portfolio'>
        <Row>
          <Col>
            <PortfolioForm onSubmit={createPortfolio} />
            {error && <div className='alert alert-danger mt-5'>{error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(CreatePortfolio)(['admin']);
