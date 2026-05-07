-- ============================================
-- DevProse Blog: posts 테이블 마이그레이션
-- ============================================

-- 1. posts 테이블 생성
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  cover_image_url TEXT,
  reading_time_min INTEGER DEFAULT 5,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. 인덱스
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);

-- 3. updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. RLS(Row Level Security) 활성화
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책

-- 모든 사용자가 게시글을 읽을 수 있음 (비로그인 포함)
CREATE POLICY "posts_select_all"
  ON public.posts
  FOR SELECT
  USING (true);

-- 인증된 사용자만 게시글 생성 가능
CREATE POLICY "posts_insert_authenticated"
  ON public.posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- 본인 게시글만 수정 가능
CREATE POLICY "posts_update_own"
  ON public.posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- 본인 게시글만 삭제 가능
CREATE POLICY "posts_delete_own"
  ON public.posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);
