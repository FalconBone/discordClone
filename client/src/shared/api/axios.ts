import axios from "axios";
import { backendBaseUrl } from "shared/config/backend";

const $axios = axios.create({
    baseURL: backendBaseUrl
})

const $authAxios = axios.create({
    baseURL: backendBaseUrl
})