-- ============================================
-- DevProse Blog: 시드 데이터
-- ============================================
-- 주의: author_id는 NULL로 설정합니다.
-- 실제 운영 시 auth.users에 등록된 사용자 UUID로 교체하세요.

INSERT INTO public.posts (title, summary, content, category, cover_image_url, reading_time_min, author_id, created_at) VALUES

-- Architecture 카테고리
(
  'Microservices vs Monoliths: A Pragmatic Approach',
  'When scaling a team, the architectural choices you make have profound implications. This deep dive explores the trade-offs between microservices and monolithic architectures.',
  'Full content for microservices vs monoliths article...',
  'Architecture',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  8,
  NULL,
  '2024-10-24T09:00:00Z'
),
(
  'Event-Driven Architecture in Practice',
  'Learn how to design and implement event-driven systems that scale. From message queues to event sourcing patterns.',
  'Full content for event-driven architecture article...',
  'Architecture',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
  10,
  NULL,
  '2024-10-18T09:00:00Z'
),

-- React 카테고리
(
  'Mastering React Server Components',
  'Server Components introduce a paradigm shift in how we build React applications. Learn how to leverage them for better performance and developer experience.',
  'Full content for React Server Components article...',
  'React',
  'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=400&fit=crop',
  12,
  NULL,
  '2024-10-20T09:00:00Z'
),
(
  'React 19 새로운 기능 완전 정복',
  'React 19의 새로운 훅, 서버 액션, 그리고 성능 최적화 기법을 알아봅니다.',
  'Full content for React 19 article...',
  'React',
  'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop',
  15,
  NULL,
  '2024-10-15T09:00:00Z'
),

-- TypeScript 카테고리
(
  'Advanced TypeScript Patterns for Large Codebases',
  'Discover advanced type patterns including conditional types, template literal types, and mapped types that make your code bulletproof.',
  'Full content for TypeScript patterns article...',
  'TypeScript',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
  11,
  NULL,
  '2024-10-12T09:00:00Z'
),
(
  'TypeScript 5.x: 실전 타입 가드와 제네릭',
  'TypeScript의 타입 가드와 제네릭을 활용하여 더 안전한 코드를 작성하는 방법을 소개합니다.',
  'Full content for TypeScript generics article...',
  'TypeScript',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop',
  9,
  NULL,
  '2024-10-08T09:00:00Z'
),

-- DevOps 카테고리
(
  'Container Orchestration: Beyond the Basics',
  'Move past basic Kubernetes deployments. Learn about service mesh, GitOps workflows, and advanced scaling strategies.',
  'Full content for container orchestration article...',
  'DevOps',
  'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
  14,
  NULL,
  '2024-10-05T09:00:00Z'
),
(
  'CI/CD 파이프라인 구축 완벽 가이드',
  'GitHub Actions와 Docker를 활용한 자동화 배포 파이프라인을 처음부터 끝까지 구축하는 방법을 알아봅니다.',
  'Full content for CI/CD pipeline article...',
  'DevOps',
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop',
  13,
  NULL,
  '2024-09-28T09:00:00Z'
),

-- Backend 카테고리
(
  'Building Scalable APIs with Edge Functions',
  'Edge computing is reshaping how we think about API design. Explore patterns for building globally distributed, low-latency APIs.',
  'Full content for edge functions article...',
  'Backend',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop',
  7,
  NULL,
  '2024-09-25T09:00:00Z'
),
(
  'Database Performance: 쿼리 최적화 전략',
  'PostgreSQL 쿼리 최적화, 인덱싱 전략, 그리고 대용량 데이터 처리를 위한 실전 가이드입니다.',
  'Full content for database performance article...',
  'Backend',
  'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=800&h=400&fit=crop',
  10,
  NULL,
  '2024-09-20T09:00:00Z'
),

-- Frontend 카테고리
(
  'CSS Architecture for Modern Web Apps',
  'From CSS Modules to Tailwind CSS, explore different approaches to styling large-scale applications and find what works best for your team.',
  'Full content for CSS architecture article...',
  'Frontend',
  'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
  6,
  NULL,
  '2024-09-15T09:00:00Z'
),
(
  'Web Performance: Core Web Vitals 최적화',
  'Core Web Vitals를 이해하고 LCP, FID, CLS를 최적화하는 실전 기법을 소개합니다.',
  'Full content for web performance article...',
  'Frontend',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  8,
  NULL,
  '2024-09-10T09:00:00Z'
);
