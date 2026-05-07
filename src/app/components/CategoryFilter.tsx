interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange("전체")}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
          selectedCategory === "전체"
            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
            : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
        }`}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
            selectedCategory === category
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
              : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
