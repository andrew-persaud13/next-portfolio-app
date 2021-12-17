import Link from 'next/link';
import moment from 'moment';

const BlogCard = ({ blog }) => {
  return (
    <>
      <div className='post-preview clickable'>
        <Link href='/blogs/[slug]' as={`/blogs/${blog.slug}`}>
          <a>
            <h2 className='post-title'>{blog.title}</h2>
            <h3 className='post-subtitle'>{blog.subtitle}</h3>
          </a>
        </Link>
        <p className='post-meta'>
          Posted by
          <a href='#'> {blog.user.name} </a>-{' '}
          {moment(blog.createdAt).format('LLLL')}
        </p>
      </div>
      <hr></hr>
    </>
  );
};

export default BlogCard;
