import axios from "axios";
import { API } from "../constants";
import {PartialTask, Task} from "../types/Task";

export class TaskService {
  
  static async getTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(
        `${API.BASE}/tasks`,
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

  static async getTaskById(taskId: string): Promise<Task> {
    try {
      const response = await axios.get<Task>(
        `${API.BASE}/tasks/${taskId}`,
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

  static async getCompletedTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(
        `${API.BASE}/tasks/completed`,
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

  static async createTask(partialTask: PartialTask) {
    try {
      await axios.post(
        `${API.BASE}/tasks`,
        partialTask,
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
