import {useState} from 'react'
import {} from 'react-icons/ai'
import {CiSearch} from 'react-icons/ci'
export default function Search() {
  const [searchQuery, setsearchQuery] = useState("")
  return (
    <div className='flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-[350px]'>
      <input value={searchQuery} onChange = {e => setsearchQuery(e.target.value)}
        placeholder="Search By channel/Hashtag"
        className='w-[300px] focus:outline-none bg-inherit'
      />
      <CiSearch className='w-5 h-5 cursor-pointer' />
    </div>
  )
}
