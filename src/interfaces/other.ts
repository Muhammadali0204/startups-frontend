export interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
};

export type ErrorResponse = {
  status: number;
  data: string | { detail?: string };
};