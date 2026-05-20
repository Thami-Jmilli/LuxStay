import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "/api";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(BASE_URL + url);
        setData(res.data);
      } catch (e) {
        setError(e);
        console.log(e); // helps debugging
      }
      setLoading(false);
    };

    fetchData();
  }, [url]); // 👈 important (refetch when URL changes)

  const reFetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + url);
      setData(res.data);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetchData };
};

export default useFetch;