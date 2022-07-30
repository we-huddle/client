import axios from "axios";
import {Profile} from "../types/Profile";
import {API} from "../constants";

export class SessionService {
  static async destroySession() {
    try {
      await axios.get<Profile>(
        `${API.BASE}/session/destroy`,
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`
          }
        }
      );
    } catch (e) {
      throw new Error();
    }
  }
}