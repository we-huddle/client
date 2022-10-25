import axios from "axios";
import { API } from "../constants";
import {BadgeDto, BadgeWithDependencies, PartialBadge, EditBadge} from "../types/HuddlerBadge";

export class BadgeService {
  static async getBadges(): Promise<BadgeDto[]> {
    try {
      const response = await axios.get<BadgeDto[]>(
        `${API.BASE}/badges`,
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

  static async getBadgeById(id: string): Promise<BadgeWithDependencies> {
    try {
      const response = await axios.get<BadgeWithDependencies>(
        `${API.BASE}/badges/${id}`,
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

  static async createBadge(partialBadge: PartialBadge) {
    try {
      await axios.post(
        `${API.BASE}/badges`,
        partialBadge,
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

  static async editBadge(badgeId: string, badge: EditBadge) {
    try {
      await axios.put(
          `${API.BASE}/badges/${badgeId}`,
          badge,
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

  static async getCompletedBadges(): Promise<BadgeDto[]> {
    try {
      const response = await axios.get<BadgeDto[]>(
        `${API.BASE}/badges/completed`,
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

  static async getCompletedBadgesbyUser(profileId: string): Promise<BadgeDto[]> {
    try {
      const response = await axios.get<BadgeDto[]>(
        `${API.BASE}/badges/completedByUser/${profileId}`,
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

  static async uploadBadgeImage(data: FormData): Promise<string> {
    try {
      const response = await axios.post<string>(
        `${API.BASE}/image`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
