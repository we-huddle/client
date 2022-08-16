import axios from "axios";
import {API} from "../constants";
import {PartialSprint, Sprint} from "../types/Sprint";
import {Issue} from "../types/Issue";

export class SprintsAndIssuesService {
  static async getSprints(): Promise<Sprint[]> {
    try {
      const response = await axios.get<Sprint[]>(
        `${API.BASE}/sprints`,
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

  static async createSprint(partialSprint: PartialSprint) {
    try {
      await axios.post(
        `${API.BASE}/sprints`,
        partialSprint,
        {
          headers: {
            Authorization: `Bearer ${API.TOKEN}`
          }
        }
      );
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  static async getIssuesOfSprint(sprintId: string): Promise<Issue[]> {
    try {
      const response = await axios.get<Issue[]>(
        `${API.BASE}/sprints/${sprintId}/issues`,
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

  static async addIssuesToSprint(sprintId: string, issueIdList: string[]) {
    try {
      await axios.post(
        `${API.BASE}/sprints/${sprintId}/issues`,
        issueIdList,
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

  static async getIssues(): Promise<Issue[]> {
    try {
      const response = await axios.get<Issue[]>(
        `${API.BASE}/issues`,
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

  static async getOpenIssues(): Promise<Issue[]> {
    try {
      const response = await axios.get<Issue[]>(
        `${API.BASE}/issues/open`,
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