import Head from 'next/head'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import ImageCard from '../components/ImageCard.js'
import ImageSearch from '../components/ImageSearch.js'

export default function Home() {
    const [images,setimage] = useState([])
    const [loading,setloading] = useState(true)
    const [term,setterm] =useState('')
    useEffect(()=>{
        fetch(`https://pixabay.com/api/?key=29364044-49575ec96fe3c21952d8ab3c7&q=${term}&image_type=photo`)
            .then(res=> res.json())
            .then(data=>{
                setimage(data.hits);
                setloading(false);
            })
            .catch(err => console.log(err));
    },[term])
    console.log(images)
    return (
        <div className="container mx-auto">
            <ImageSearch searchText={(text) => setterm(text)} />
            {!loading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }
            {loading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> :
            <div className="grid grid-cols-3 gap-4">
                {images.map((data)=>(
                    <ImageCard key={data.id} image={data}/>
                ))}
            </div>}
        </div>
    )
}
