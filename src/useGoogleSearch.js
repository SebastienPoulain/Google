import { useState, useEffect } from "react";
import API_KEY from "./keys";

const CONTEXT_KEY = "ebb11b39a21f48744";

const useGoogleSearch = (term) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}&gl=fr`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchData();
  }, [term]);
  return { data };
};

export default useGoogleSearch;
