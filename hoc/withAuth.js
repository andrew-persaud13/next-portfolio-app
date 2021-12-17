import { useGetUser } from '../actions/user';
import Redirect from '../components/shared/Redirect';

const withAuth = Component => (roles, all = false) => props => {
  const { data, loading } = useGetUser();
  if (loading) return <p>Loading...</p>;

  const isAuthorized = data && checkIsAuthorized(data, roles, all);

  if (!isAuthorized) {
    return <Redirect ssr to='/api/v1/login' />;
  }

  return <Component {...props} data={data} loading={loading} />;
};

const checkIsAuthorized = (data, roles, all) => {
  if (!roles) return true;
  if (all)
    return roles.every(role =>
      data['http://next-portfolio-andrew' + '/roles'].includes(role)
    );

  return roles.some(role =>
    data['http://next-portfolio-andrew' + '/roles'].includes(role)
  );
};

export default withAuth;
