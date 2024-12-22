import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './components/Collection/Collection';
import { Loader } from './components/Loader/Loader';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
  ]


function App() {
  const [page, setPage] = useState(1)
  const [categoryID, setCategoryID] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const[searchValue, setSearchValue] = useState('')
  const [collections, setCollections] = useState([])


  useEffect(() => {
    setIsLoading(true)
    const category =  categoryID ? `category=${categoryID} ` : '';
    fetch(`https://67640e6e17ec5852caeb02a3.mockapi.io/photo-collections?page=${page}&limit=3&${category}`,
    )
      .then((res) => res.json())
      .then((json) => {
      setCollections(json); 
      })
      .catch((err) => {
        console.warn('Ошибка при запросе:', err);
        alert('Ошибка при получении данных');
      }).finally(() => {setIsLoading(false)

      });
  }, [categoryID,page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj,i) => <li onClick={() => setCategoryID(i)} className={categoryID === i ? 'active' : ''}key={obj.name}>{obj.name}</li>)
            
          }
        </ul>
        <input 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        
      {isLoading ? <Loader />
      :
      collections.filter(obj =>{
        return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase());
      }).map((obj,index) => (
        <Collection key = {index} name = {obj.name} images={obj.photos}/>)
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, i) => (
            <li onClick={() => setPage(i + 1)} className={page === (i + 1) ? 'active' : ''}>{i + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
