import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'









export const Home = () => {
    const navigate = useNavigate()
    const [recipes, setRecipes] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([])
    const [cookies, _] = useCookies(["access_token"])
const userID = useGetUserID()
if (!userID){
    navigate('/auth')
}
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get('http://localhost:3001/recipes')
               setRecipes(response.data)
             
              
            } catch (err) {
                console.error(err)
            }
        }
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`)
               setSavedRecipes(response.data.savedRecipes)
             
              
            } catch (err) {
                console.error(err)
            }
        }
        fetchRecipe()
        if(cookies.access_token)fetchSavedRecipe();
    }, [])
    const saveRecipe = async (e,recipeID) => {
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:3001/recipes',{
                recipeID, 
                userID,
            },
            {headers: {authorization: cookies.access_token}}
            )
           setSavedRecipes(response.data.savedRecipes)
         
          
        } catch (err) {
            console.error(err)
        }
    }
    
const isRecipeSaved = (id) => {
    
   
   return savedRecipes.includes(id)
}

    return (
    <div>
        <h1>Recipes</h1>
    <ul style={{listStyle:'none'}}>
        { recipes.map((recipe ) => (
        <li key={recipe._id}>
           
            <div>
                <h2>{recipe.name}</h2>
                <button onClick={(e) => saveRecipe(e,recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                    {isRecipeSaved(recipe._id)? "Saved":'Save'}
                </button>
            </div>
            <div className ='instructions'>
                <p>{recipe.instructions}</p>

            </div>
            <img src={recipe.imageUrl} width='400px' alt={recipe.name} />
            <p> Cooking Time: {recipe.cookingTime} (minutes)</p>
        </li>
        ))}
    </ul>
    </div>
    )
}
