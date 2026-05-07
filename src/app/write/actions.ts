"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function publishPost(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tagsString = formData.get("tags") as string;
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { error: "You must be logged in to publish a post." };
  }

  // Parse tags and use the first one as category
  const tags = tagsString.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
  const category = tags.length > 0 ? tags[0] : "General";

  // Create summary from content (first 150 characters)
  const summary = content.slice(0, 150).replace(/[#*`]/g, "") + "...";
  
  // Calculate reading time (roughly 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const reading_time_min = Math.max(1, Math.ceil(wordCount / 200));

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title,
        content,
        category,
        summary,
        reading_time_min,
        author_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error publishing post:", error);
    return { error: "Failed to publish post. Please try again." };
  }

  revalidatePath("/");
  redirect(`/posts/${data.id}`);
}

export async function updatePost(postId: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tagsString = formData.get("tags") as string;
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { error: "You must be logged in to update a post." };
  }

  // Parse tags and use the first one as category
  const tags = tagsString.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
  const category = tags.length > 0 ? tags[0] : "General";

  // Create summary from content (first 150 characters)
  const summary = content.slice(0, 150).replace(/[#*`]/g, "") + "...";
  
  // Calculate reading time (roughly 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const reading_time_min = Math.max(1, Math.ceil(wordCount / 200));

  const { error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      category,
      summary,
      reading_time_min,
    })
    .eq("id", postId)
    .eq("author_id", user.id); // Security: Ensure author is updating

  if (error) {
    console.error("Error updating post:", error);
    return { error: "Failed to update post. Please try again." };
  }

  revalidatePath(`/posts/${postId}`);
  revalidatePath("/");
  redirect(`/posts/${postId}`);
}
