import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import axios from 'axios';
import { Navbar, NavbarBrand, Container, Row, Col } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [recipes, setRecipes] = useState([]);
    const [recipeToEdit, setRecipeToEdit] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = () => {
        axios.get(`${API_URL}`)
            .then(response => {
                setRecipes(response.data || []);  // Ensure recipes is set to an array
            })
            .catch(error => {
                console.error("There was an error fetching the recipes!", error);
                setRecipes([]);  // Set to empty array on error
            });
    };

    const addRecipe = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
    };

    const updateRecipe = (updatedRecipe) => {
        setRecipes(recipes.map(recipe => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe)));
        setRecipeToEdit(null);
    };

    const handleEdit = (recipe) => {
        setRecipeToEdit(recipe);
    };

    const cancelEdit = () => {
        setRecipeToEdit(null);
    };

    return (
        <div className="App">
            <ToastContainer />
            <Navbar className="navbar" dark expand="md">
                <NavbarBrand href="/">Recipe Book</NavbarBrand>
            </Navbar>
            <Container className="mt-4 flex-grow-1">
                <Row>
                    <Col md="8">
                        <h2 className="section-title">{recipeToEdit ? "Edit Recipe" : "Add a New Recipe"}</h2>
                        {recipeToEdit ? (
                            <EditRecipe recipe={recipeToEdit} updateRecipe={updateRecipe} cancelEdit={cancelEdit} />
                        ) : (
                            <AddRecipe addRecipe={addRecipe} />
                        )}
                    </Col>
                    <Col md="4">
                        <h2 className="section-title">Recipe List</h2>
                        <RecipeList
                            recipes={recipes}
                            setRecipes={setRecipes}
                            handleEdit={handleEdit}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
