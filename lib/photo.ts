

export const getPhotos = async () => {
    const res = await fetch('http://jsonplaceholder.typicode.com/photos')
    const photos = await res.json()
    return photos
}