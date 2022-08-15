import axios from "axios";
import { API } from "../constants";
import {PartialTask, Task, TaskPayload, TaskPayloadToTask} from "../types/Task";

export class TaskService {
  static async getTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<TaskPayload[]>(
        `${API.BASE}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`
          }
        }
      );
      return response.data.map((taskPayload) => TaskPayloadToTask(taskPayload));
    } catch (e) {
      throw new Error();
    }
  }

  static async getCompletedTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<TaskPayload[]>(
        `${API.BASE}/tasks/completed`,
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`
          }
        }
      );
      return response.data.map((taskPayload) => TaskPayloadToTask(taskPayload));
    } catch (e) {
      throw new Error();
    }
  }

  static async createTask(partialTask: PartialTask) {
    try {
      await axios.post<TaskPayload[]>(
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
