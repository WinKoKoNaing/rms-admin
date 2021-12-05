import { DotsHorizontalIcon } from '@heroicons/react/solid'
import TagBox from 'components/common/TagBox';
export default function FilterMenu() {


    return (
        <div className='flex gap-3 items-center'>
            {
                <TagBox />
            }

            <button className='border p-1 flex items-center shadow-sm rounded-md hover:border-red-500'>
                <DotsHorizontalIcon className="h-5 w-5 text-red-500" />
                <span className='ml-1 text-red-500'>More</span>
            </button>
        </div>
    )
}