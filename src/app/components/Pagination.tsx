interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function getPageNumbers(): (number | "...")[] {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="페이지네이션">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 text-slate-400 transition-all hover:border-slate-600 hover:bg-slate-700/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-700 disabled:hover:bg-slate-800/50 disabled:hover:text-slate-400"
        aria-label="이전 페이지"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-slate-500"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? "border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/10"
                : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600 hover:bg-slate-700/50 hover:text-white"
            }`}
            aria-label={`${page}페이지`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 text-slate-400 transition-all hover:border-slate-600 hover:bg-slate-700/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-700 disabled:hover:bg-slate-800/50 disabled:hover:text-slate-400"
        aria-label="다음 페이지"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
