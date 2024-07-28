import React, { useEffect, useState } from 'react';
import './index.css';
import { Collection } from './Collections';


const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Гори" },
  { "name": "Архітектура" },
  { "name": "Міста" }
];




function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const[collection, setCollection] = useState([]);

  const [filter, setFilter] = useState('');


  const categoryMain = `${categoryId ? `category=${categoryId}` :''}`;
  useEffect(()=>{

      setIsLoading(true);
      fetch(`https://66a36f2544aa6370458129a8.mockapi.io/phot_colections?page=${page}&limit=3&${categoryMain}`).then((res)=>res.json()).then((json)=>{
        setCollection(json);
      }).catch((e)=>{
        console.log(e);
      }).finally(()=>{
        setIsLoading(false);
      })
  },[categoryId,page])

 


  const filtration = () =>{
    return collection.filter((col)=>col.name.toLowerCase().includes(filter.toLowerCase()));
  }
  const inputFilter = (value) =>{
    setFilter(value);
  } 
  return (
    <div className="App">
      <h1>Колекція фото</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((e,index)=>(
            <li onClick={()=>setCategoryId(index)} className={categoryId===index ? 'active' : ''} key={e.id}>{e.name}</li>
          ))}
        </ul>
        <input value={filter}  onChange={(e) => inputFilter(e.target.value)}  className="search-input" placeholder="Пошук по назві" />
      </div>
      <div className="content">

  
        

        {isLoading
        ? <h1>Йде загрузка....</h1>
        :filtration().map((obj, index)=>(
          <Collection
          key={index}
          name={obj.name}
          images={obj.photos}
        />
      ))
        }



      </div>
      <ul className="pagination">
       { [...Array(5)].map((_,index)=>(
        <li onClick={()=>setPage(index+1)} className={page===index+1 ? 'active' : ''} key={index}>{index+1}</li>
       ))}
      </ul>
    </div>
  );
}

export default App;
