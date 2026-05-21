import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://luxstay-rlva.onrender.com/api";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(BASE_URL + url, {
          withCredentials: true,
        });

        setData(res.data);
      } catch (err) {
        console.log(err);

        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  const reFetchData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(BASE_URL + url, {
        withCredentials: true,
      });

      setData(res.data);
    } catch (err) {
      console.log(err);

      setError(true);
    }

    setLoading(false);
  };

  return { data, loading, error, reFetchData };
};

export default useFetch;