import axios from "axios";
import retry from "axios-retry";
import { getIdToken } from "firebase/auth";
import { auth } from "./firebase";

retry(axios, { retries: 3 });

const { NODE_ENV } = process.env;
let base = null;
switch (NODE_ENV) {
  case "production": {
    base = `https://${window.location.hostname}/api`;
    break;
  }
  default: {
    base = `http://${window.location.hostname}:8080/api`;
  }
}

const service = async (method, endpoint, data) => {
  const token = await getIdToken(auth.currentUser);
  return axios({
    method: method,
    url: `${base}${endpoint}`,
    data,
    headers: {
      "X-SAV-User": token,
    },
  });
};

export default service;
