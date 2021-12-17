// import useSWR from 'swr';\
import { useState } from 'react';

export const fetcher = url =>
  fetch(url).then(async res => {
    const result = await res.json();
    if (res.status !== 200) {
      return Promise.reject(result);
    }
    return result;
  });

export const useApiHandler = apiCall => {
  const [requestState, setRequestState] = useState({
    error: null,
    data: null,
    loading: false,
  });
  const handler = async (...data) => {
    setRequestState({ error: null, data: null, loading: true });

    try {
      const res = await apiCall(...data);
      setRequestState({ error: null, data: res.data, loading: false });
      return res.data;
    } catch (err) {
      const message =
        (err.response && err.response.data.message) ||
        'Oops something went wrong...';
      setRequestState({ error: message, data: null, loading: false });
      return Promise.reject(message);
    }
  };
  return [handler, { ...requestState }];
};

// export const useGetPosts = () => {
//   const { data, error, ...rest } = useSWR('/api/v1/posts', fetcher);
//   const loading = !data && !error;
//   return { data, error, loading, ...rest };
// };

// export const useGetPost = id => {
//   const { data, error, ...rest } = useSWR(
//     id ? `/api/v1/posts/${id}` : null,
//     fetcher
//   );
//   debugger;
//   const loading = !data && !error;
//   return { data, error, loading, ...rest };
// };

// export const useGetData = url => {
//   const [data, setData] = useState();
//   const [error, setError] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getData = async () => {
//       const res = await axios.get(url);
//       const result = res.data;

//       if (res.status !== 200) {
//         setError(result);
//       } else {
//         setData(result);
//       }
//       setLoading(false);
//     };

//     url && getData();
//   }, [url]);
//   return { data, error, loading };
// };
