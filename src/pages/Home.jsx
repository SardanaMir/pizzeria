import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Categories from '../components/Categories'
import Sorting from '../components/Sortng'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

export const Home = () => {
  console.log('home')

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const {searchValue} = useContext(SearchContext)

  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  useEffect(()=>{
    setIsLoading(true)
    
    const sortBy = sortType.sortProperty.replace('-','')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : ''; 
    const search = searchValue ? `search=${searchValue}` : ''; 

    fetch(`https://64c688f80a25021fde91bd95.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

    .then((res) => res.json())
    .then((arr) =>{
      setItems(arr)
      setIsLoading(false)
    })
    window.scrollTo(0,0)
  },[categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map((obj) =>(<PizzaBlock key={obj.id} {...obj}/>))

  return(

    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id)=>setCategoryId(id)} />
        <Sorting value={sortType} onChangeSort={(id)=>setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((_, index)=> <Skeleton key={index}/>) 
          : pizzas
        }
      </div>
      <Pagination onChangePage={(number)=>setCurrentPage(number)}/>
    </div>

  )
}
export default Home