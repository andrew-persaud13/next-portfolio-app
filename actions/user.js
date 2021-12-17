import useSWR from 'swr';
import { fetcher } from './';

export const useGetUser = () => {
  const { data, error, ...rest } = useSWR('/api/v1/me', fetcher);
  const loading = !data && !error;

  return { data, error, loading, ...rest };
};
