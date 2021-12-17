import auth0 from '@/utils/auth0';

import BlogApi from '@/lib/api/blogs';

export default async function (req, res) {
  try {
    const { accessToken } = await auth0.getSession(req);
    const result = await new BlogApi(accessToken).create(req.body);
    const blog = result.data;

    res.json(blog);
  } catch (err) {
    return res.status(err.status || 422).json(err.response.data);
  }
}
