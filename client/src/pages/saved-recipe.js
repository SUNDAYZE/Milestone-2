import { useState, useEffect } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'









export const SavedRecipes = () => {
    const navigate = useNavigate()
    const [savedRecipes, setSavedRecipes] = useState([])
const userID = useGetUserID()
if (!userID){
    navigate('/auth')
}
    useEffect(() => {
        
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
               setSavedRecipes(response.data.savedRecipes)
             
              
            } catch (err) {
                console.error(err)
            }
        }
        
        fetchSavedRecipe()
    }, [])
   
    

    
   
 


    return (
    <div>
        <h1>Saved Recipes</h1>
    <ul style={{listStyle:'none'}}>
        { savedRecipes.map((recipe ) => (
        <li key={recipe._id}>
           
            <div>
                <h2>{recipe.name}</h2>
                
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
