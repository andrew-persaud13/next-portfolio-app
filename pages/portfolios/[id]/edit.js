import { useRouter } from 'next/router';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

import PortfolioForm from '@/components/PortfolioForm';
import Redirect from '@/components/shared/Redirect';

import withAuth from '@/hoc/withAuth';

import {
  useGetPortfolio,
  useUpdatePortfolio,
} from '../../../actions/portfolios';

const PortfolioEdit = ({ data: user, loading: loadingUser }) => {
  const { query } = useRouter();
  const { data: dataP } = useGetPortfolio(query.id);
  const [
    updatePortfolio,
    { data: editedP, error, loading },
  ] = useUpdatePortfolio();

  const handleEdit = async data => {
    try {
      await updatePortfolio(query.id, data);
      toast.success('Portfolio has been updated!', { autoClose: 2000 });
    } catch (err) {
      toast.error(err, { autoClose: 2000 });
    }
  };

  return (
    <BaseLayout user={user} loading={loadingUser}>
      <BasePage header='Portfolio Edit'>
        <Row>
          <Col md='8'>
            {dataP && <PortfolioForm portfolio={dataP} onSubmit={handleEdit} />}
            {error && <div className='alert alert-danger mt-3'>{error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(PortfolioEdit)(['admin']);

// import BaseLayout from '@/components/layouts/BaseLayout';
// import BasePage from '@/components/BasePage';

// import { useGetUser } from '../actions/user';

// const PortfolioEdit = () => {
//   const { data, loading } = useGetUser();
//   return (
//     <BaseLayout user={data} loading={loading}>
//       <BasePage header='Portfolio Edit'></BasePage>
//     </BaseLayout>
//   );
// };

// export default PortfolioEdit;
