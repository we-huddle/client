import axios from "axios";
import {API} from "../constants";
import {Profile} from "../types/Profile";

export class UserServices {
  static async fetchSelf(): Promise<Profile> {
    try {
      const response = await axios.get<Profile>(
        `${API.BASE}/user/self`,
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`
          }
        }
      );
      return response.data;
    } catch (e) {
      throw new Error();
    }
  }
}
