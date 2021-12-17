import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

import withAuth from '@/hoc/withAuth';

const AdminTest = ({ data, loading }) => {
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage>
        <h1>Secret -- {data.name}</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(AdminTest)(['admin']);
