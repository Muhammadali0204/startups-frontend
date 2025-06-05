
import { OutputBlockData } from "@editorjs/editorjs";
import { User } from "./auth";


export interface ProjectInterface{
  id: string;
  user: User;
  data: OutputBlockData;
  views_count: number;
  likes_count: number;
  shares_count: number;
  liked: boolean;
  created_time: Date;
  required_funds: number;
}

export interface ShortProjectInterface {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
}
