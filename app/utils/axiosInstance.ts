import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/resource",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
  postResource: (data: {
    title: string;
    description: string;
    url: string;
    category: string;
  }) => {
    return axiosInstance.post("/", data);
  },
  getResources: () => {
    return axiosInstance.get("/");
  },
  getResource: (id: string) => {
    return axiosInstance.get(`/${id}`);
  },
  updateResource: (
    id: string,
    data: {
      title: string;
      description: string;
      url: string;
      category: string;
    }
  ) => {
    return axiosInstance.put(`/${id}`, data);
  },
  deleteResource: (id: string) => {
    return axiosInstance.delete(`/${id}`);
  },
};

export default api;
