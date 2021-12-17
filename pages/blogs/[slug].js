import React from 'react';
import { Row, Col } from 'reactstrap';
import { SlateView } from 'slate-simple-editor';

import { useGetUser } from '@/actions/user';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '../../components/BasePage';
import BlogApi from '@/lib/api/blogs';
import Avatar from '@/components/shared/Avatar';

const BlogDetail = ({ blog, author }) => {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage className='slate-container'>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Avatar
              imgSrc={author.picture}
              name={author.name}
              createdAt={blog.createdAt}
            />
            <hr />
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const res = await new BlogApi().getAll();
  const blogs = res.data;
  const paths = blogs.map(blog => ({
    params: { slug: blog.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const result = await new BlogApi().getBySlug(slug);

  return {
    props: {
      blog: result.data.blog,
      author: result.data.author,
    },
  };
}

export default BlogDetail;
