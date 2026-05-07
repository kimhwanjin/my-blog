import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Post } from "@/types";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  const { data: { user } } = await supabase.auth.getUser();
  const isAuthor = user && post.author_id === user.id;

  const typedPost = post as Post;
  const formattedDate = new Date(typedPost.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 pb-32">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-emerald-400 transition-colors">
          Home
        </Link>
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-300">{typedPost.category}</span>
      </nav>

      {/* Category Badges */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="rounded-md bg-slate-800/50 border border-slate-700/50 px-2.5 py-1 text-xs font-semibold text-slate-300">
          {typedPost.category}
        </span>
        <span className="rounded-md bg-slate-800/50 border border-slate-700/50 px-2.5 py-1 text-xs font-semibold text-slate-300">
          Tech
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-10 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
        {typedPost.title}
      </h1>

      {/* Author Header */}
      <div className="mb-10 flex flex-col gap-6 border-y border-slate-800/60 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
              alt="Author Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Sarah Chen</span>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Staff Engineer @ TechCorp</span>
              <span className="h-1 w-1 rounded-full bg-slate-700"></span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthor && (
            <Link 
              href={`/posts/${typedPost.id}/edit`}
              className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400 transition-all hover:bg-emerald-500/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Post
            </Link>
          )}
          <button className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-700/50 hover:text-white">
            <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            1.2k
          </button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="mb-12 overflow-hidden rounded-2xl border border-slate-800/60 shadow-2xl">
        {typedPost.cover_image_url ? (
          <img
            src={typedPost.cover_image_url}
            alt={typedPost.title}
            className="w-full object-cover"
          />
        ) : (
          <div className="aspect-[21/9] w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <svg className="h-20 w-20 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <article className="blog-content max-w-none">
        <p className="text-xl leading-relaxed text-slate-300 mb-8 font-medium italic opacity-90">
          {typedPost.summary}
        </p>
        
        <div className="whitespace-pre-wrap text-slate-300 leading-relaxed space-y-6">
          {typedPost.content || "No content available."}
        </div>

        {/* Mock Content to simulate the design */}
        <div className="mt-12 space-y-10">
          <h2 className="text-2xl font-bold text-white">The Case for gRPC</h2>
          <p>
            Unlike REST over HTTP/1.1, gRPC leverages HTTP/2, enabling multiplexing, server push, and header compression. 
            More importantly, it uses Protocol Buffers (Protobuf) for serialization.
          </p>
          
          <blockquote className="border-l-4 border-emerald-500 bg-emerald-500/5 px-6 py-4 rounded-r-lg italic text-slate-200">
            "The strict contract enforcement provided by Protobuf eliminates an entire class of runtime errors related to schema mismatches between services."
          </blockquote>

          <div className="rounded-xl border border-slate-800 bg-[#161b22] p-6 font-mono text-sm overflow-x-auto shadow-inner">
            <div className="flex justify-between items-center mb-4 text-slate-500 border-b border-slate-800 pb-2">
              <span>protobuf</span>
              <button className="hover:text-emerald-400">copy</button>
            </div>
            <pre className="text-emerald-300/90 leading-relaxed">
{`syntax = "proto3";

package ordering;

service OrderService {
  rpc CreateOrder(OrderRequest) returns (OrderResponse);
  rpc StreamOrders(stream OrderRequest) returns (stream OrderResponse);
}

message OrderRequest {
  string customer_id = 1;
  repeated Item items = 2;
}`}
            </pre>
          </div>

          <div className="rounded-xl border-l-4 border-emerald-400 bg-emerald-400/5 p-6 flex gap-4">
             <div className="text-emerald-400">
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
             <div>
               <h4 className="font-bold text-white mb-1">Performance Note</h4>
               <p className="text-sm text-slate-400">In our benchmarks, migrating from JSON/HTTP to gRPC reduced p99 tail latency by 40% for internal service calls.</p>
             </div>
          </div>
        </div>
      </article>

      {/* Author Bio Card */}
      <section className="mt-20 rounded-2xl border border-slate-800 bg-[#161b22]/50 p-8 text-center backdrop-blur-sm">
        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-2xl border-2 border-slate-700 shadow-xl">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            alt="Author Big Avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-lg font-bold text-white">Written by Sarah Chen</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-lg mx-auto">
          Staff Engineer specializing in distributed systems and Go. Occasional open-source contributor. Believes in strict typing and comprehensive test coverage.
        </p>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <a href="#" className="text-emerald-400 hover:underline">@sarahchen</a>
          <a href="#" className="text-emerald-400 hover:underline">github.com/schen</a>
        </div>
      </section>

      {/* Discussion Section */}
      <section className="mt-20">
        <h2 className="mb-8 text-3xl font-bold text-white">Discussion (3)</h2>
        <div className="rounded-xl border border-slate-800 bg-[#161b22]/30 p-1">
          <textarea
            placeholder="Add a valuable thought..."
            className="w-full bg-transparent p-4 text-slate-300 outline-none min-h-[120px]"
          />
          <div className="flex justify-end p-2 border-t border-slate-800/60">
            <button className="rounded-lg bg-emerald-500 px-6 py-2 text-sm font-bold text-slate-900 transition-all hover:bg-emerald-400">
              Post Comment
            </button>
          </div>
        </div>
        
        <div className="mt-10 space-y-8">
           <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">JD</div>
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">John Doe</span>
                    <span className="text-xs text-slate-500">2 days ago</span>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed mb-2">
                   Great article. Have you looked into ConnectRPC as an alternative? It offers gRPC compatibility but might be easier to integrate with web clients without Envoy.
                 </p>
                 <button className="text-xs font-bold text-emerald-400 hover:underline">Reply</button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
