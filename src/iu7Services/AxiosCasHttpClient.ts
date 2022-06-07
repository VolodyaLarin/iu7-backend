import axios from "axios";
import { injectable } from "inversify";
import { CasHttpClient } from "./BmstuCasService";

@injectable()
export default class AxiosCasHttpClient implements CasHttpClient {
  async send(url: string): Promise<{ body: string }> {
    const res = await axios.get(url);

    return { body: res.data };
  }
}
