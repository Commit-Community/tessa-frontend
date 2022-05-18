import { useEffect, useState } from "react";

const useApiData = ({ deps = [], initialData = null, path }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const { signal } = controller;
    fetch(`${process.env.REACT_APP_API_ORIGIN}${path}`, {
      credentials: "include",
      signal,
    })
      .then((res) => res.json())
      .then(
        ({ data }) => {
          setIsLoading(false);
          setData(data);
        },
        (error) => {
          setIsLoading(false);
          if (error.name === "AbortError") {
            return;
          }
          setError(error);
        }
      );
    return () => controller.abort();
    // eslint-disable-next-line
  }, [path, ...deps]);
  return { data, error, isLoading };
};

export default useApiData;
