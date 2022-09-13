import axios from "axios";
import { API } from "../constants";
import {BadgeDto} from "../types/HuddlerBadge";

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
}
