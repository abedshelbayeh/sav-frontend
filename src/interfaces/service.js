import axios from "axios";
import retry from "axios-retry";

retry(axios, { retries: 3 });

const { NODE_ENV } = process.env;
let base = `http://${window.location.hostname}`;
switch (NODE_ENV) {
  case "production": {
    base = `${base}/api`;
    break;
  }
  default: {
    base = `${base}:8080`;
  }
}

const service = async (method, endpoint, data) => {
  return axios({
    method: method,
    url: `${base}${endpoint}`,
    data,
  });
};

export default service;
