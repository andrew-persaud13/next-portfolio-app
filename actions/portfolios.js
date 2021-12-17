import axios from 'axios';
import useSWR from 'swr';

import { fetcher } from './';
import { useApiHandler } from './';

const createPortfolio = data => axios.post('/api/v1/portfolios', data);
const updatePortfolio = (id, data) =>
  axios.patch(`/api/v1/portfolios/${id}`, data);

const deletePortfolio = id => axios.delete(`/api/v1/portfolios/${id}`);

//Define your api calls and pass them to useApiHandler
export const useCreatePortfolio = () => useApiHandler(createPortfolio);
export const useGetPortfolio = id => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/portfolios/${id}` : null,
    fetcher
  );
  const loading = !data && !error;

  return { data, error, loading, ...rest };
};

export const useUpdatePortfolio = () => useApiHandler(updatePortfolio);
export const useDeletePortfolio = () => useApiHandler(deletePortfolio);
