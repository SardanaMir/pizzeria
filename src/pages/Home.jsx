import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useContext } from 'react'
import Categories from '../components/Categories'
import Sorting from '../components/Sortng'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

export const Home = () => {
  const dispatch = useDispatch()

  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const sortType = sort.sortProperty;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {searchValue} = useContext(SearchContext)
  
  const onClickCategory = (id) =>{
    dispatch(setCategoryId(id))
  }

  useEffect(()=>{
    setIsLoading(true)
    
    const sortBy = sortType.replace('-','')
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : ''; 
    const search = searchValue ? `search=${searchValue}` : ''; 

    axios.get(`https://64c688f80a25021fde91bd95.mockapi.io/pizza?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`)
    .then(res => {
      setItems(res.data)
      setIsLoading(false)
    });

    window.scrollTo(0,0)
  },[categoryId, sortType, searchValue, currentPage])

  const onChangePage = (number) =>{
    dispatch(setCurrentPage(number))
  }

  const pizzas = items.map((obj) =>(<PizzaBlock key={obj.id} {...obj}/>))

  return(

    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id)=>onClickCategory(id)} />
        <Sorting />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((_, index)=> <Skeleton key={index}/>) 
          : pizzas
        }
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage}/>
    </div>

  )
}
export default Home