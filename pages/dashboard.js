import Link from 'next/link';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/hoc/withAuth';
import { Row, Col, Button } from 'reactstrap';
import Masthead from '@/components/shared/Masthead';
import PortDropdown from '../components/shared/Dropdown';

import { useUpdateBlog, useGetUserBlogs } from '../actions/blogs';
import { toast } from 'react-toastify';

const Dashboard = ({ data: user, loading: isUserLoading }) => {
  const { data: blogs, error, mutate } = useGetUserBlogs();
  const [
    updateBlog,
    { data, loading: isBlogUpdating, error: updatingError },
  ] = useUpdateBlog();
  const createOption = status =>
    status === 'draft'
      ? {
          view: 'Publish Blog',
          value: 'published',
        }
      : {
          view: 'Make draft',
          value: 'draft',
        };

  const createOptions = (blog, idx) => {
    const { view, value } = createOption(blog.status);
    return [
      {
        key: blog._id,
        text: view,
        handlers: {
          onClick: () => changeBlogStatus(blog._id, { status: value }),
        },
      },
      {
        key: blog._id + idx,
        text: 'Delete',
        handlers: {
          onClick: () => changeBlogStatus(blog._id, { status: 'deleted' }),
        },
      },
    ];
  };

  const changeBlogStatus = (id, data) => {
    updateBlog(id, data)
      .then(_ => mutate())
      .catch(err => toast.error('Something went wrong, please try again...'));
  };

  const renderBlogs = status =>
    blogs &&
    blogs
      .filter(blog => blog.status === status)
      .map((blog, idx) => (
        <ul className='user-blogs-list' key={blog._id}>
          <li>
            <Link href='/blogs/editor/[id' as={`/blogs/editor/${blog._id}`}>
              <a>{blog.title}</a>
            </Link>
            <PortDropdown items={createOptions(blog, idx)} />
          </li>
        </ul>
      ));

  return (
    <BaseLayout navClass='transparent' user={user} loading={isUserLoading}>
      <Masthead imagePath='/images/home-bg.jpg'>
        <h1>Blogs Dashboard</h1>
        <span className='subheading'>
          Let's write some nice blog today
          <Link href='/blogs/editor'>
            <Button color='primary'>Create a new Blog</Button>
          </Link>
        </span>
      </Masthead>
      <BasePage className='blog-user-page'>
        <Row>
          <Col md='6' className='mx-auto text-center'>
            <h2 className='blog-status-title'> Published Blogs </h2>
            {renderBlogs('published')}
          </Col>
          <Col md='6' className='mx-auto text-center'>
            <h2 className='blog-status-title'> Draft Blogs </h2>
            {renderBlogs('draft')}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

// export const getServerSideProps = withAuth(async ({ req, res }) => {
//   const { accessToken } = await auth0.getSession(req);
//   const result = await new BlogApi(accessToken).getByUser();
//   const blogs = result.data;
//   return { blogs };
// })(['admin']);

export default withAuth(Dashboard)(['admin']);
