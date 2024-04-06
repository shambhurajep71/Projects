import React from 'react'

const Pagination = ({prePage, nextPage, currPage}) => {
  return (
    <div className='flex justify-center items-center gap-5'>
        <button onClick={prePage} className='border-2 border-yellow-400 rounded-lg bg-slate-700 text-white p-2 m-4 text-center font-semibold'>Previous</button>
        <div className=' font-semibold text-black bg-slate-100 pl-2 pr-2 pt-1 pb-1 rounded-lg text-xl'>{currPage}</div>
        <button onClick={nextPage} className='border-2 border-yellow-400 rounded-lg bg-slate-700 text-white p-2 m-4 text-center font-semibold'>Next</button>
    </div>
  )
}

export default React.memo(Pagination)