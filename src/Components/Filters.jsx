import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './Context'
import meal1 from '../assets/meals1.jpg'
import { Mixpanel } from '../mixpanel';
import { allMeals } from "../constants";

const Filters = () => {
    const [searchData, setSearchData] = useState('');
    const { sort, updateSort, searchByName, select, updateSelect } = useContext(AppContext);

    const handleOnChange = (e) => {
        const value = e.target.value;
        setSearchData(value);
    };

    const handleOnClick = (e) => {
        Mixpanel.track(
            'searched_your_favourite_meal',
            {
                keyword: searchData,
            }
          );

        searchByName(searchData);
    }

    const handleOnChangeType = (e) => {
        const type = e.target.value;
        updateSelect(type);

        let allData = [];
        if (type === 'all') {
            allData = allMeals;
        } else {
            allData = allMeals.filter((item => item.category.toLowerCase().startsWith(type)));
        }
        // console.log('type >>> ', type);
        // console.log('allData >>> ', allData.length);
        // mixpanel - category_filtered

        Mixpanel.track(
            'category_filtered',
            {
              filter_category: type,
              meal_results: allData.length,
            },
        );      
    }

    return (
        <section className='filter-section'>
            <div style={{ background: 'red', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img style={{ width: '100%', minHeight: 450 }} src={meal1} alt="meal1" />
                <div style={{ position: 'absolute', left: 'calc(50% - 60px)', top: '150px' }} className="meal-title">
                    Meals
                </div>
            </div>

            <div className='meal-search-bar' style={{ height: '100px', display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                <form>
                    <input style={{ borderRadius: '15px' }} type="text" onChange={handleOnChange} placeholder='Search Your Favourite Meals' />
                    <span style={{ marginLeft: 10 }} className='bi bi-search' onClick={handleOnClick}></span>
                </form>
            </div>

            <div className='filtering'>
                <div className='meal-select'>
                    <label htmlFor="select">Meal type</label>
                    <form>
                        <select className='select-bar' name="category" value={select} onChange={handleOnChangeType} >
                            <option value="all">All Meals</option>
                            <option value="breakfast">BREAKFAST</option>
                            <option value="soup">SOUP</option>
                            <option value="salad">SALAD</option>
                            <option value="drink">DRINK</option>
                            <option value="main">MAIN</option>
                        </select>
                    </form>
                </div>

                <div className='sort-select'>
                    <label htmlFor="select">Sort</label>
                    <form>
                        <select className='sort-bar' name="sort" id="sort" value={sort} onChange={updateSort}>
                            <option>Sort By</option>
                            <option value="title">A to Z</option>
                            <option value="-title">Z to A</option>
                            <option value="-price">Price: Highest to Lowest</option>
                            <option value="price">Price: Lowest to Highest</option>
                        </select>
                    </form>
                </div>
            </div>



        </section>
    )
}

export default Filters
