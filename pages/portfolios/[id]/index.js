import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

import { useGetUser } from '@/actions/user';
import PortfolioApi from '@/lib/api/portfolios';

const Portfolio = ({ portfolio }) => {
  const { data: user, error: userError, loading: userLoading } = useGetUser();

  return (
    <BaseLayout user={user} loading={userLoading}>
      <BasePage header='Portfolio Detail'>{portfolio.title}</BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const res = await new PortfolioApi().getAll();
  const portfolios = res.data;
  const paths = portfolios.map(portfolio => ({
    params: { id: portfolio._id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await new PortfolioApi().getById(params.id);
  const portfolio = res.data;
  console.log(portfolio);
  return { props: { portfolio } };
}

// Portfolio.getInitialProps = async ({ query }) => {
//   try {
//     const res = await axios.get(
//       `https://jsonplaceholder.typicode.com/posts/${query.id}`
//     );
//     const post = res.data;
//     return { post };
//   } catch (err) {
//     console.log('error');
//   }
// };

export default Portfolio;
