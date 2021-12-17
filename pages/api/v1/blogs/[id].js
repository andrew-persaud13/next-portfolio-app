import BlogApi from '@/lib/api/blogs';

import auth0 from '@/utils/auth0';

export default async function (req, res) {
  const { id } = req.query;
  const { accessToken } = await auth0.getSession(req);
  if (req.method === 'GET') {
    return getById(id, res);
  }

  if (req.method === 'PATCH') {
    return update(id, req.body, accessToken, res);
  }
}

const getById = async (id, res) => {
  try {
    const result = await new BlogApi().getById(id);
    const blog = result.data;
    return res.json(blog);
  } catch (err) {
    return res.status(err.status || 422).json(err.response.data);
  }
};

const update = async (id, data, accessToken, res) => {
  try {
    const result = await new BlogApi(accessToken).update(id, data);
    const blog = result.data;
    return res.json(blog);
  } catch (err) {
    return res.status(err.status || 422).json(err.response.data);
  }
};
