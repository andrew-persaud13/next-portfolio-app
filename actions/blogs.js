import axios from 'axios';
import useSWR from 'swr';

import { useApiHandler, fetcher } from './';

//get  ==>swr
export const useGetBlog = id => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/blogs/${id}` : null,
    fetcher
  );
  const loading = !data && !error;
  return { data, error, loading, ...rest };
};

export const useGetUserBlogs = () => {
  const { data, error, ...rest } = useSWR(`/api/v1/blogs/me`, fetcher);
  const loading = !data && !error;
  return { data, error, loading, ...rest };
};

//create
export const createBlog = data => axios.post('/api/v1/blogs', data);
export const useCreateBlog = () => useApiHandler(createBlog);

//update
export const updateBlog = (id, data) =>
  axios.patch(`/api/v1/blogs/${id}`, data);
export const useUpdateBlog = () => useApiHandler(updateBlog);
//delete
