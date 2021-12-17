import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

import { useGetUser } from '../../actions/user';

const Forum = () => {
  const { data, error, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage>
        <h1>Forum will go here</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Forum;
