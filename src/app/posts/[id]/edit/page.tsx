import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Editor from "@/app/write/Editor";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Get current user to check authorship
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth");
  }

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  // Security: Only allow author to edit
  if (post.author_id !== user.id) {
    redirect(`/posts/${id}`);
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Editor initialData={{
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category
      }} />
    </div>
  );
}
