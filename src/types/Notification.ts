export interface Notification {
  id: string;
  profileId: string;
  linkId: string;
  type: NotificationType;
  title: string;
  description: string;
  read_status: boolean;
  created_at: number;
  updated_at: number;
}

export enum NotificationType {
  task = "TASK",
  badge = "BADGE",
}
