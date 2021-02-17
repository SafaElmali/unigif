import toast from "../utils/toaster";
import axios from "axios";
import { searchURL, trendURL } from "../utils/api";

const fetchGifs = (offset) => {
  const url = trendURL + `&offset=${offset}`;
  return axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        toast.info(res.message);
      }
    })
    .catch((err) => {
      toast.error(err);
    });
};

const fetchMoreGifs = (searchValue, offset) => {
  const url = searchURL + `&q=${searchValue}&offset=${offset}`;
  return axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        return res;
      }
    })
    .catch((err) => {
      toast.error(err);
    });
};

export default { fetchGifs, fetchMoreGifs };
