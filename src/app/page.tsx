"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Post } from "@/types";
import BlogCard from "./components/BlogCard";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  // 카테고리 목록 가져오기
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from("posts")
        .select("category")
        .order("category");

      if (data) {
        const uniqueCategories = [...new Set(data.map((d) => d.category))];
        setCategories(uniqueCategories);
      }
    }
    fetchCategories();
  }, [supabase]);

  // 게시글 가져오기
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);

    const from = (currentPage - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    let query = supabase
      .from("posts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (selectedCategory !== "전체") {
      query = query.eq("category", selectedCategory);
    }

    const { data, count } = await query;

    if (data) {
      setPosts(data as Post[]);
    }
    if (count !== null) {
      setTotalCount(count);
    }

    setIsLoading(false);
  }, [supabase, currentPage, selectedCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 카테고리 변경 시 1페이지로
  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-24">
      {/* Hero Title */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Latest from
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            DevProse
          </span>
        </h1>
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      {/* Blog Card List */}
      <section className="mb-10">
        {isLoading ? (
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-800/60 bg-[#161b22]/50"
              >
                <div className="aspect-[16/9] bg-slate-800/50" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-slate-700/50" />
                  <div className="h-4 w-full rounded bg-slate-700/30" />
                  <div className="h-4 w-2/3 rounded bg-slate-700/30" />
                  <div className="flex gap-4">
                    <div className="h-3 w-24 rounded bg-slate-700/20" />
                    <div className="h-3 w-20 rounded bg-slate-700/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="mb-4 h-16 w-16 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg font-medium text-slate-400">
              게시글이 없습니다
            </p>
            <p className="mt-1 text-sm text-slate-500">
              해당 카테고리에 작성된 글이 아직 없어요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <section className="mb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      )}
    </div>
  );
}
