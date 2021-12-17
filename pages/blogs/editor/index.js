import { useRouter } from 'next/router';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/hoc/withAuth';
import { Editor } from 'slate-simple-editor';

import { useCreateBlog } from '@/actions/blogs';
import { toast } from 'react-toastify';

const BlogEditor = ({ data: user, loading: loadingU }) => {
  const router = useRouter();
  const [createBlog, { error, loading, data: createdBlog }] = useCreateBlog();
  const saveBlog = async data => {
    const createdBlog = await createBlog(data);
    router.push('/blogs/editor/[id]', `/blogs/editor/${createdBlog._id}`);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <BaseLayout user={user} loading={loadingU}>
      <BasePage>
        <Editor onSave={saveBlog} loading={loading} />
      </BasePage>
    </BaseLayout>
  );
};
export default withAuth(BlogEditor)(['admin']);
