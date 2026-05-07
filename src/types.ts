export interface Post {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  category: string;
  cover_image_url: string | null;
  reading_time_min: number;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}
