import { Row, Col } from 'reactstrap';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';
import Masthead from '@/components/shared/Masthead';
import BlogCard from '@/components/BlogCard';
import BlogApi from '@/lib/api/blogs';

const Blogs = ({ blogs }) => {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout
      navClass='transparent'
      className='blog-listing-page'
      user={data}
      loading={loading}
    >
      <Masthead imagePath='/images/home-bg.jpg'>
        <h1>Fresh Blogs</h1>
        <span className='subheading'>Programming, travelling...</span>
      </Masthead>
      <BasePage className='blog-body'>
        <Row>
          {blogs.map(blog => (
            <Col key={blog._id} md='10' lg='8' className='mx-auto'>
              <BlogCard blog={blog} />
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const result = await new BlogApi().getAll();

  return {
    props: {
      blogs: result.data,
    },
    revalidate: 60,
  };
}

export default Blogs;
