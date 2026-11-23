interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-byu-navy rounded-md px-3 py-2 text-sm font-medium hover:enabled:bg-slate-100 focus-visible:ring-2 focus-visible:ring-byu-royal focus-visible:outline-none disabled:cursor-not-allowed disabled:text-slate-300"
      >
        Previous
      </button>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <span>Page</span>
        <select
          aria-label="Go to page"
          value={currentPage}
          onChange={(event) => onPageChange(Number(event.currentTarget.value))}
          className="text-byu-navy h-10 min-w-16 rounded-md border border-slate-300 bg-white px-2 focus-visible:ring-2 focus-visible:ring-byu-royal focus-visible:outline-none"
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <span>of {totalPages}</span>
      </label>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-byu-navy rounded-md px-3 py-2 text-sm font-medium hover:enabled:bg-slate-100 focus-visible:ring-2 focus-visible:ring-byu-royal focus-visible:outline-none disabled:cursor-not-allowed disabled:text-slate-300"
      >
        Next
      </button>
    </nav>
  );
}
