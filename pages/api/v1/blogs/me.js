import BlogApi from '@/lib/api/blogs';

import auth0 from '@/utils/auth0';
export default async function (req, res) {
  try {
    const { accessToken } = await auth0.getSession(req);
    const result = await new BlogApi(accessToken).getByUser();
    const blogs = result.data;
    res.json(blogs);
  } catch (err) {
    return res.status(err.status || 422).json(err.response.data);
  }
}
