import {useEffect, useState} from "react"
import './App.css'
function App(){
  const [images,setImages]=useState([])
  const [search,setSearch]=useState("")
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    fetchImages();
  },[])
  
  function fetchImages(){
    setLoading(true)
    fetch('https://picsum.photos/v2/list?page=1&limit=200')
    .then(res=>res.json())
    .then((data)=>{setImages(data)
      setLoading(false)
    })
  }

  function HandleSearch(){
    if(!search.trim()) {
      fetchImages()
      return
    }
 
  setLoading(true)

  fetch("https://picsum.photos/v2/list?page=2&limit=100")
  .then(res=>res.json())
  .then((data)=>{
    setImages(data)
    setLoading(false)
  })
  .catch((err)=>{
    console.error("Search error: ",err)
    setLoading(false)
  })
} 
return(
  <>
  <div>
    <h1>
      Image Gallery
    </h1>
  </div>
  <div  className="center">
   <input type="text" placeholder="Search Images......." value={search} onChange={(e)=>setSearch(e.target.value)} />
   <button onClick={HandleSearch}>Search</button> 
  </div>  
  
  <div className="grid">
  {
    loading ?
    (<p>loading.......................</p>):(
      <div className="grid">
        {images.map((img)=>(
          <div key={img.id}>
            <img src={`https://picsum.photos/id/${img.id}/300/200`} alt="Gallery" />
            <p>Author: {img.author}</p>
          </div>
        ))}
      </div>
    )
  }
  </div>
  
  </>
)


}
export default App