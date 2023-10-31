import React, { useEffect, useReducer, useState } from "react";
import reducer from './Reducer'
import axios from "axios";
import { meals_URL as url } from "../../Utils/constants";
import { search_Meals_URL as URI } from "../../Utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { allMeals } from "../constants";


/*TO INITALIZE CART STATE*/
const getLocalStorage = ()=>{
    const init = localStorage.getItem('cart')
    if(init){
        return JSON.parse(localStorage.getItem('cart'))
    }else{
        return []
    }
}
/*SATES*/
const initialState = {
    isNavbarOpen: false,
    isLoading:false,
    meals: [],
    filter_Meals: [],
    selected_Meals: [],
    sort: '',
    select: '',
    text: '',
    cart: getLocalStorage(),
    total_items:0,
    total_amount:0
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    /*AUTH0*/
    const [isAuthenticatedTwo, setIsAuthenticatedTwo] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    if(isAuthenticated){
        //console.log(user.name)
        //console.log(user.email)
    }

    const [myUser, setMyUser] = useState(null);

    useEffect(()=>{
       setMyUser(user) 
    },[user])

    const generateCurrentUser = (email) => {
      console.log('generateCurrentUser >>> ', email);
      setCurrentUser(email);
    }


    /*NAVBAR FUNCTIONALITY*/
    const [state, dispatch] = useReducer(reducer, initialState)

    const openNavbar = () => {
        dispatch({ type: 'OPEN_NAVBAR' })
    }
    const closeNavbar = () => {
        dispatch({ type: 'CLOSE_NAVBAR' })
    }


    /*FETCH MEALS*/
    const fetchMeals = async (url) => {
        try {
            // const response = await axios(url);
            // const data = response.data;
            const data = allMeals;
            dispatch({ type: 'GET_MEALS', payload: data })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMealsBySearch = (search) => {
        // try {
        //     // const response = await axios(URI);
        //     // const data = response.data;
        //     const data = allMeals
        //     dispatch({ type: 'FETCH_SEARCH_MEALS', payload: data })
        // } catch (error) {
        //     console.log(error)
        // }
        const data = allMeals.filter((item) => {
            const titleLowerCase = item.title.toLowerCase();
            return titleLowerCase.indexOf(search.toLowerCase()) >= 0
        });
        dispatch({ type: 'FETCH_SEARCH_MEALS', payload: data })
    }

    const fetchSelectMeal = (id) => {
        // try {
        //     console.log('fetchSelectMeal url >>>> ', url);
        //     const response = await axios(url);
        //     const data = response.data;
        //     dispatch({ type: 'GET_SELECT_MEAL', payload: data })
        // } catch (error) {
        //     console.log(error)
        // }

        const data = allMeals.find((item) => item._id === id);
        dispatch({ type: 'GET_SELECT_MEAL', payload: data })
    }


    /*SORTING*/
    const updateSort = (e) => {
        const value = e.target.value;
        dispatch({ type: 'UPDATE_SORT', payload: value })
    }

    const updateSelect = (type) => {
        // const value = e.target.value;
        dispatch({ type: 'UPDATE_SELECT', payload: type })
    }

    /*SEARCHING*/
    const searchByName = (str) => {
        // const value = e.target.value;
        dispatch({ type: 'SEARCH_BY_NAME', payload: str })
    }


    /*ADDTOCART*/
    const addToCart = (_id, title, image, category, description, price, amount) => {
        dispatch({type:'ADD_TO_CART', payload:{_id, title, image, category, description, price, amount}})
    }

    /*LOCAL_STORAGE*/
    useEffect(()=>{
        dispatch({type:'COUNT_CART_TOTAL'})
        localStorage.setItem('cart',JSON.stringify(state.cart))
    },[state.cart])

    /*REMOVE MEAL*/
    const removeMeal = (_id)=>{
        dispatch({type:'REMOVE_MEAL', payload:_id})
    }
    /*TOGGLE_AMOUNT*/
    const increaseAmount = (_id)=>{
        //console.log(_id)
        dispatch({type:'INCREASE_AMOUNT', payload: _id})
    }
    const decreaseAmount = (_id)=>{
        //console.log(_id)
        dispatch({type:'DECREASE_AMOUNT', payload: _id})

    }
    /*CLEAR_CART*/
    const clearCart = (_id)=>{
        dispatch({type:'CLEAR_CART', payload:_id})
    }
    /*CLEAR_CART_AFTER_PAYMENT*/
    const emptyCart = ()=>{
        dispatch({type:'CLEAR_CART_AFTER_PAYMENT'})
    }


    /*MOUNTING*/
    useEffect(() => {
        fetchMeals(url);
    }, [])

    /*ON SEARCH FIX*/ 
    useEffect(() => {
        fetchMeals(url);
    }, [state.selected_Meals])

    useEffect(() => {
        dispatch({ type: 'SORT_MEALS' });
    }, [state.sort])

    useEffect(() => {
        fetchMealsBySearch(state.text);
        //dispatch({type: 'GET_SEARCH_MEALS'})
    }, [state.text])

    useEffect(() => {
        dispatch({ type: 'LOAD_CATEGORIES' })
    }, [state.select])


    return <AppContext.Provider
        value={{
            ...state,
            openNavbar,
            closeNavbar,
            updateSort,
            searchByName,
            updateSelect,
            fetchSelectMeal,
            addToCart,
            removeMeal,
            clearCart,
            increaseAmount,
            decreaseAmount,
            loginWithRedirect,
            logout,
            emptyCart,
            user,
            myUser,
            generateCurrentUser,
            currentUser,
        }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppProvider }