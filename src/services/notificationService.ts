import axios from "axios";
import { Notification } from "../types/Notification";
import { API } from "../constants";

export class NotificationService {
  static async getNotifications() {
    try {
      const response = await axios.get<Notification[]>(
        `${API.BASE}/notifications`,
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

  static async dismissNotification(id: string) {
    try {
      await axios.put(
        `${API.BASE}/notifications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`,
          },
        }
      );
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  static async dismissAllNotifications() {
    try {
      await axios.put(
        `${API.BASE}/notifications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`,
          },
        }
      );
    } catch (e) {
      throw new Error();
    }
  }
}
