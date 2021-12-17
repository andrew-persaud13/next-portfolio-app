import { useRouter } from 'next/router';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/hoc/withAuth';
import { Editor } from 'slate-simple-editor';

import { useGetBlog, useUpdateBlog } from '../../../actions/blogs';
import { toast } from 'react-toastify';

const BlogUpdateEditor = ({ data: user, loading: loadingU }) => {
  const router = useRouter();
  const { data } = useGetBlog(router.query.id);
  const [
    updateBlog,
    { data: updatedBlog, error, loading: isBlogSaving },
  ] = useUpdateBlog();

  const handleUpdateBlog = async data => {
    await updateBlog(router.query.id, data);
    toast.success('Blog updated!');
  };

  if (error) {
    toast.error(error);
  }
  return (
    <BaseLayout user={user} loading={loadingU}>
      <BasePage header='Update your blog...'>
        {data && data.content && (
          <Editor
            onSave={handleUpdateBlog}
            initialContent={data.content}
            loading={isBlogSaving}
          />
        )}
      </BasePage>
    </BaseLayout>
  );
};
export default withAuth(BlogUpdateEditor)(['admin']);
