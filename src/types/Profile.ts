export interface Profile {
  id: string;
  name: string;
  githubUsername: string;
  email: string;
  photo: string;
  githubUniqueId: string;
  accessToken: string;
  role: Profile.Role;
  createdAt: number;
  updatedAt: number;
}

export namespace Profile {
  export enum Role {
    Huddler = "HUDDLER",
    HuddleAgent = "HUDDLE_AGENT"
  }
}
