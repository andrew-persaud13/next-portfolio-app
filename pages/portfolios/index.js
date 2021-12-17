import { useRouter } from 'next/router';
import { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import PortfolioCard from '@/components/PortfolioCard';

import { useGetUser } from '@/actions/user';
import { useDeletePortfolio } from '../../actions/portfolios';
import PortfolioApi from '@/lib/api/portfolios';
import { checkIsAuthorized } from '@/utils/auth0';

const Portfolios = ({ portfolios: portfoliosFetched }) => {
  const [portfolios, setPortfolios] = useState(portfoliosFetched);
  const { data: user, error: userError, loading: userLoading } = useGetUser();
  const [
    deletePortfolio,
    { data: deletedPortfolio, loading: deleteLoading },
  ] = useDeletePortfolio();
  const router = useRouter();

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      await deletePortfolio(id);
      setPortfolios(portfolios.filter(p => p._id !== id));
      toast.success('Deleted!', { autoClose: 2000 });
    } catch (err) {
      toast.error(err, { autoClose: 2000 });
    }
  };

  return (
    <div>
      <BaseLayout user={user} loading={userLoading}>
        <BasePage className='portfolio-page' header='Portfolios'>
          <Row>
            {portfolios.map(portfolio => (
              <Col
                key={portfolio._id}
                md='4'
                onClick={() => {
                  router.push(
                    '/portfolios/[id]',
                    `/portfolios/${portfolio._id}`
                  );
                }}
              >
                <PortfolioCard portfolio={portfolio}>
                  {user && checkIsAuthorized(user, ['admin']) && (
                    <>
                      <Button
                        onClick={e => {
                          e.stopPropagation();
                          router.push(
                            '/portfolios/[id]/edit',
                            `/portfolios/${portfolio._id}/edit`
                          );
                        }}
                        className='mr-2'
                        color='warning'
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={e => handleDelete(e, portfolio._id)}
                        color='danger'
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </PortfolioCard>
              </Col>
            ))}
          </Row>
        </BasePage>
      </BaseLayout>
    </div>
  );
};

//called during build time -- improves performance by creating static page w/ dynamic data
export async function getStaticProps() {
  const res = await new PortfolioApi().getAll();
  const portfolios = res.data;

  return {
    props: {
      portfolios,
    },
    revalidate: 60,
  };
}

// Portfolios.getInitialProps = async () => {
//   let posts = [];
//   try {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     posts = res.data;
//   } catch (err) {
//     console.error('Error occurred.');
//   }

//   return { posts: posts.slice(0, 10) };
// };

export default Portfolios;
