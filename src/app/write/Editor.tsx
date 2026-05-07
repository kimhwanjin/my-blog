"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { 
  Bold, Italic, Type, Quote, Code, 
  Link as LinkIcon, Image as ImageIcon,
  Strikethrough, ChevronRight, Loader2
} from "lucide-react";
import { publishPost, updatePost } from "./actions";
import { createClient } from "@/utils/supabase/client";

interface EditorProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    category: string;
  };
}

export default function Editor({ initialData }: EditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [tags, setTags] = useState(initialData?.category || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const insertText = (before: string, after: string = "") => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText = before + selectedText + after;
    
    setContent(
      textarea.value.substring(0, start) + 
      newText + 
      textarea.value.substring(end)
    );
    
    // Focus back and set selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `post-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      insertText(`![${file.name}](`, `${publicUrl})`);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    setIsPublishing(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);

    let result;
    if (initialData?.id) {
      result = await updatePost(initialData.id, formData);
    } else {
      result = await publishPost(formData);
    }
    
    if (result?.error) {
      setError(result.error);
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1117] text-slate-300 pb-20">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Toolbar */}
      <div className="sticky top-0 z-40 bg-[#161b22] border-b border-slate-800 p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex bg-[#0d1117] rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setMode("edit")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mode === "edit" 
                  ? "bg-emerald-500 text-slate-900" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setMode("preview")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mode === "preview" 
                  ? "bg-emerald-500 text-slate-900" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Preview
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-slate-500 text-sm font-medium hover:text-slate-400 transition-colors">
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-1.5 rounded-md text-sm font-bold transition-colors disabled:opacity-50"
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto p-6 flex flex-col">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent text-4xl font-bold text-white placeholder-slate-700 outline-none mb-4 w-full"
        />

        <div className="flex items-center gap-2 mb-8">
          <span className="text-slate-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Add tags separated by commas"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-transparent text-slate-400 placeholder-slate-700 outline-none text-sm w-full"
          />
        </div>

        {mode === "edit" ? (
          <div className="flex-1 flex flex-col border border-slate-800 rounded-xl overflow-hidden bg-[#0d1117]">
            {/* Markdown Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-slate-800 bg-[#161b22]">
              <button onClick={() => insertText("**", "**")} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Bold"><Bold size={18}/></button>
              <button onClick={() => insertText("_", "_")} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Italic"><Italic size={18}/></button>
              <button onClick={() => insertText("~~", "~~")} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Strikethrough"><Strikethrough size={18}/></button>
              <div className="w-px h-6 bg-slate-800 mx-1" />
              <button onClick={() => insertText("# ")} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Heading"><Type size={18}/></button>
              <button onClick={() => insertText("> ")} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Quote"><Quote size={18}/></button>
              <div className="w-px h-6 bg-slate-800 mx-1" />
              <button onClick={() => insertText("`", "`")} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Code"><Code size={18}/></button>
              <button onClick={() => insertText("```\n", "\n```")} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Code Block"><ChevronRight size={18}/></button>
              <div className="w-px h-6 bg-slate-800 mx-1" />
              <button onClick={() => insertText("[", "](url)")} className="p-2 hover:bg-slate-800 rounded transition-colors" title="Link"><LinkIcon size={18}/></button>
              <button 
                onClick={() => fileInputRef.current?.click()} 
                disabled={isUploading}
                className="p-2 hover:bg-slate-800 rounded transition-colors relative" 
                title="Upload Image"
              >
                {isUploading ? <Loader2 size={18} className="animate-spin text-emerald-500" /> : <ImageIcon size={18}/>}
              </button>
            </div>
            
            <textarea
              ref={textareaRef}
              placeholder="Write your post content here using Markdown..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 p-6 bg-transparent outline-none resize-none min-h-[500px] text-lg leading-relaxed placeholder-slate-700 text-slate-300"
            />
          </div>
        ) : (
          <div className="flex-1 border border-slate-800 rounded-xl p-6 bg-[#0d1117] prose prose-invert max-w-none prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-slate-800 prose-headings:text-white prose-a:text-emerald-400 min-h-[500px]">
            <ReactMarkdown>{content || "*Preview content will appear here...*"}</ReactMarkdown>
          </div>
        )}
      </main>
    </div>
  );
}

