import axios from "axios";
import { base_url } from "./base_url";

export default axios.create({
  baseURL: `${base_url}/api`,
});
