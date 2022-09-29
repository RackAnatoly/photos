import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collections} from './components/Collections'

const cats = [
    {"name": "Все"},
    {"name": "Море"},
    {"name": "Горы"},
    {"name": "Архитектура"},
    {"name": "Города"}
]

function App() {

    const [category, setCategory] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [collections, setCollections] = useState([])
    useEffect(() => {
        const categoryId = category ? `category=${category}` : ''
        setIsLoading(true)
        fetch(`https://6335dcef8aa85b7c5d2481bf.mockapi.io/photos?page=${page}&limit=3&${categoryId}`)
            .then((res) => res.json())
            .then((json) => {
                setCollections(json)
            })
            .catch((err) => {
                console.log(err)
                //alert('Error with getting data')
            })
            .finally(() => setIsLoading(false))
    }, [category,page])

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {cats.map((obj, i) => (
                        <li
                            onClick={() => setCategory(i)}
                            className={category === i ? 'active' : ''} key={obj.name}>{obj.name}</li>))}
                </ul>
                <input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    className="search-input"
                    placeholder="Поиск по названию"/>
            </div>
            <div className="content">
                {isLoading
                    ? <h2> Loading...</h2>
                    :
                    (collections
                        .filter(obj => {
                            return obj.name.toLowerCase().includes(searchValue.toLowerCase())
                        })
                        .map((obj) => (
                            <Collections
                                key={obj.index}
                                name={obj.name}
                                images={obj.photos}
                            />
                        )))}
            </div>
            <ul className="pagination">
                {[...Array(5)].map((_, i) => (
                    <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
