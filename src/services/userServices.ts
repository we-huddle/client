import axios from "axios";
import { API } from "../constants";
import { Profile, PartialProfile } from "../types/Profile";

export class UserServices {
  static async fetchSelf(): Promise<Profile> {
    try {
      const response = await axios.get<Profile>(`${API.BASE}/user/self`, {
        headers: {
          Authorization: `Bearer ${API.TOKEN}`,
        },
      });
      return response.data;
    } catch (e) {
      throw new Error();
    }
  }

  static async getProfileById(profileId: string) {
    try {
      const response = await axios.get<Profile>(
        `${API.BASE}/profile/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      throw new Error();
    }
  }

  static async editProfile(partialProfile: PartialProfile) {
    try {
      await axios.put(`${API.BASE}/profile`, partialProfile, {
        headers: {
          Authorization: `Bearer ${API.TOKEN}`,
        },
      });
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }
}
