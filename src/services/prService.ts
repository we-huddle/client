import axios from "axios";
import { API } from "../constants";
import {PullRequest} from "../types/PullRequest";

export class PRService{
    static async getUserPR(profileId: string): Promise<PullRequest[]> {
        try {
          const response = await axios.get<PullRequest[]>(
            `${API.BASE}/pullRequests/merged/byUser/${profileId}`,
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
