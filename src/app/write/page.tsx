import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Editor from "./Editor";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default async function WritePage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth");
  }

  return (
    <>
      <Header />
      <Editor />
      <BottomNav />
    </>
  );
}
