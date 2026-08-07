export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  description?: string;
  color: string;
  type: string;
};
export type Review = {
  id: string;
  date: string;
  content: string;
  category: string;
  score: number;
};
export type Inspiration = {
  id: string;
  title: string;
  content: string;
  tag: string;
};
export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export interface TaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  category?: string;
}

export interface ReviewInput {
  content: string;
  category: string;
  score: number;
}

export interface InspirationInput {
  title: string;
  content: string;
  tag: string;
}

export interface CalendarEntry {
  date: string;
  title: string;
  description?: string;
  type?: string;
}