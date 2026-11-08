import React, { Suspense } from 'react'
import Loading from './Loading'
import ImageGallery from './ImageGallery'




export default function Photos() {



    return (
        <Suspense fallback={<Loading />}>
            <ImageGallery />

        </Suspense>
    )
}
