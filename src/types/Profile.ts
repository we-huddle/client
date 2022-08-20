export interface ProfileLinks {
  github: string;
  linkedin: string;
  stackoverflow: string;
  twitter: string;
}

export interface PartialProfile {
  bio: string;
  city: string;
  links: ProfileLinks;
}

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
  bio: string;
  city: string;
  links: ProfileLinks;
}

export namespace Profile {
  export enum Role {
    Huddler = "HUDDLER",
    HuddleAgent = "HUDDLE_AGENT",
  }
}
