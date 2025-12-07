
import { ChevronLeft, ChevronRight } from 'lucide-react'
export default function Pagination({ 
  page, 
  handlePrev, 
  handleNext, 
  disableNext,
}) {
  return (
    <div className="flex flex-col items-center mt-12 gap-3">
      <div className="flex justify-center items-center gap-6">
        <button
          disabled={page === 0}
          onClick={handlePrev}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft />
        </button>
        
        <span className="font-bold text-gray-600">Page {page + 1}</span>
        
        <button
          disabled={disableNext} 
          onClick={handleNext}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Helper text when end is reached */}
      {disableNext && (
        <span className="text-sm text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
          You have reached the end of the list
        </span>
      )}
    </div>
  )
}