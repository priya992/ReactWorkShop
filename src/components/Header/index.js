import React, {useState, useEffect} from 'react';
import useDebounce from '../../hooks/useDebounce';

const Header = (props) => {
  const {pageTitle, getSearchData, closeSearch} = props

  const [displaySearch, setDisplaySearch] = useState(false)
  const [searchValue, setSearchValue] = useState(null)

  const debouncedSearchTerm = useDebounce(searchValue, 100);

  useEffect(
   () => {
      getSearchData(debouncedSearchTerm)
   },
   [debouncedSearchTerm]
 );

  useEffect(
   () => {
     if (!displaySearch) {
       closeSearch()
     }
   },
   [displaySearch]
 );

  const displaySearchHandler = () => {
    setDisplaySearch(!displaySearch)
  }

  const close = () => {
    setSearchValue(null)
    setDisplaySearch(!displaySearch)
  }

  const searchHandler = (event) => {
    const value = event.target.value
    setSearchValue(value)
  }

  const withoutSearch = (
    <div className="header-container">
      <div className="header-sub">
        <img src="media/Back.png" alt="back-btn"/>
        <div className="header-text">{pageTitle}</div>
      </div>
      <img src="media/search.png" alt="search" onClick={displaySearchHandler}/>
    </div>
  )

  const withSearch = (
    <div className="header-container">
      <img src="media/Back.png" alt="back-btn"/>
      <input
         className="search-input"
         placeholder="Search for..."
         value={searchValue}
         onChange={searchHandler}
       />
       <img src={"media/close.svg"} alt="close-btn" className="search-image" onClick={close}/>
    </div>
  )

  if (displaySearch) {
    return withSearch
  }

  return withoutSearch
}

export default Header;
