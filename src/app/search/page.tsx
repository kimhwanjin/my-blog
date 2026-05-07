"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import BlogCard from "../components/BlogCard";
import { Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  async function handleSearch(searchTerm: string) {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Search error:", error);
    } else {
      setResults(data || []);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0b1120]">
      <Header />
      
      <main className="mx-auto max-w-3xl px-4 py-8 pb-24">
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search posts by title or content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-[#161b22] border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-lg"
            autoFocus
          />
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : results.length > 0 ? (
            <>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Search Results ({results.length})
              </h2>
              {results.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </>
          ) : query.trim() ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No posts found for "{query}"</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">Start typing to search for blog posts...</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
