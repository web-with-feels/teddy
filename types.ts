export interface Note {
  id: number;
  title: string;
  message: string;
  icon?: string;
}

export interface Memory {
  id: number;
  url: string;
  caption: string;
}

export interface Reason {
  id: number;
  text: string;
}