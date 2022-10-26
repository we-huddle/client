import axios from "axios";
import { API } from "../constants";
import {Answer, PartialTask, QuizAnswerPayload, Task} from "../types/Task";
import {Profile} from "../types/Profile";

export class TaskService {
  static async getTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(`${API.BASE}/tasks`, {
        headers: {
          Authorization: `Bearer ${API.TOKEN}`,
        },
      });
      return response.data;
    } catch (e) {
      throw new Error();
    }
  }

  static async getTaskById(taskId: string, isAgent: boolean): Promise<Task> {
    try {
      const response = await axios.get<Task>(
        `${API.BASE}/tasks/${taskId}${isAgent ? "/agent" : ""}`,
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

  static async getCompletedTasks(): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(`${API.BASE}/tasks/completed`, {
        headers: {
          Authorization: `Bearer ${API.TOKEN}`,
        },
      });
      return response.data;
    } catch (e) {
      throw new Error();
    }
  }

  static async createTask(partialTask: PartialTask) {
    try {
      const type = partialTask.type === Task.Type.DEV ? "dev" : "quiz";
      await axios.post(`${API.BASE}/tasks/create/${type}`, partialTask, {
        headers: {
          Authorization: `Bearer ${API.TOKEN}`,
        },
      });
    } catch (e) {
      throw new Error();
    }
  }

  static async updateTask(taskId: string, partialTask: PartialTask) {
    try {
      const type = partialTask.type === Task.Type.DEV ? "dev" : "quiz";
      await axios.put(`${API.BASE}/tasks/${taskId}/${type}`, partialTask, {
        headers: {
          Authorization: `Bearer ${API.TOKEN}`,
        },
      });
    } catch (e) {
      throw new Error();
    }
  }

  static async deleteTask(taskId: string) {
    try {
      await axios.delete(`${API.BASE}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${API.TOKEN}`,
        },
      });
    } catch (e) {
      throw new Error();
    }
  }

  static async getAnswers(taskId: string): Promise<Answer[]> {
    try {
      const response = await axios.get<Answer[]>(
        `${API.BASE}/tasks/${taskId}/answer`,
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

  static async getAnswersByProfile(taskId: string, profileId: string): Promise<Answer[]> {
    try {
      const response = await axios.get<Answer[]>(
        `${API.BASE}/tasks/${taskId}/completedByUser/${profileId}/answer`,
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

  static async submitQuizAnswers(
    taskId: string,
    quizAnswers: QuizAnswerPayload
  ) {
    try {
      await axios.post(`${API.BASE}/tasks/${taskId}/answer`, quizAnswers, {
        headers: {
          Authorization: `Bearer ${API.TOKEN}`,
        },
      });
    } catch (e: any) {
      throw new Error(e.message());
    }
  }

  static async getCompletedByProfiles(taskId: string): Promise<Profile[]> {
    try {
      const response = await axios.get<Profile[]>(
        `${API.BASE}/tasks/${taskId}/completed/users`,
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

  static async getUserCompletedTasks(profileId: string): Promise<Task[]> {
    try {
      const response = await axios.get<Task[]>(
        `${API.BASE}/tasks/completedByUser/${profileId}`,
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
}
