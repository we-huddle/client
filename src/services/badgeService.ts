import axios from "axios";
import { API } from "../constants";
import {BadgeDto, PartialBadge} from "../types/HuddlerBadge";

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
