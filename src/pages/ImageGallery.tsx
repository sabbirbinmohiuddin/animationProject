import { use } from 'react'
import { getPhotos } from '../../lib/photo'
const picturePromise = getPhotos()

export default function ImageGallery() {

    const photos = use(picturePromise)


    return (
        <div>
            <div className='grid grid-cols-3 gap-6 m-19'>
                {photos.map((pic) => {
                    return (
                        <div key={pic.id} className='border p-4 rounded'>
                            <img className='rounded-lg' src={pic.url} alt="" />
                            <p className='font-bold bg-green-300 rounded p-2.5 m-2'>{pic.title}</p>

                        </div>

                    )

                })}
            </div>
        </div>
    )
}
