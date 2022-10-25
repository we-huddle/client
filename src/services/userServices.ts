import axios from "axios";
import {API} from "../constants";
import {Profile, PartialProfile} from "../types/Profile";

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

  static async getFollowerList(profileId: string): Promise<Profile[]> {
    try {
      const response = await axios.get<Profile[]>(`${API.BASE}/profile/${profileId}/followers`);
      return response.data;
    } catch (e) {
      throw new Error();
    }
  }

  static async followUser(profileId: string) {
    try {
      await axios.post<void>(`${API.BASE}/user/${profileId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`,
          },
        });
    } catch (e) {
      throw new Error();
    }
  }

  static async unfollowUser(profileId: string) {
    try {
      await axios.post<void>(`${API.BASE}/user/${profileId}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`,
          },
        });
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
