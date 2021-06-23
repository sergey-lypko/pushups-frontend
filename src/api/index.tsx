import axios from "axios";

const API_URL = "https://damp-thicket-05259.herokuapp.com/api";

export function getAuthHeaders() {
  const headers: any = {};
  const token = localStorage.getItem("auth-key");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

axios.interceptors.request.use((request) => {
  request.headers = {
    ...getAuthHeaders(),
    ...request.headers,
  };

  request.withCredentials = true;
  return request;
});

// FIXME: types
export const makeLoginRequest = (requestBody: any) =>
  axios.post(`${API_URL}/auth/login`, requestBody);

export const getAllResultsRecordsRequest = async () => {
  const res = await axios.get(`${API_URL}/core/`);
  return res.data;
};

export const commitNewResultRecordRequest = (requestBody: any) =>
  axios.post(`${API_URL}/core/result-commit`, requestBody);
