import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardText, Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL;

function RecipeList({ recipes, setRecipes, handleEdit }) {
    const [modal, setModal] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState(null);

    const toggleModal = () => {
        setModal(!modal);
    };

    const openModal = (recipe) => {
        setRecipeToDelete(recipe);
        setModal(true);
    };

    const deleteRecipe = () => {
        if (recipeToDelete) {
            axios.delete(`${API_URL}${recipeToDelete.id}`)
                .then(response => {
                    setModal(false);
                    setRecipeToDelete(null);
                    toast.success("Recipe deleted successfully!", {
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        window.location.reload(); // Refresh the page after the toast notification
                    }, 3000); // Adjust the timeout if necessary
                })
                .catch(error => {
                    console.error("There was an error deleting the recipe!", error);
                    toast.error("There was an error deleting the recipe!", {
                        autoClose: 3000,
                    });
                });
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Row>
                {recipes.length === 0 ? (
                    <Col>
                        <p className="text-muted">No Recipes</p>
                    </Col>
                ) : (
                    recipes.map(recipe => (
                        <Col md="12" key={recipe.id}>
                            <Card className="mb-4 shadow-sm">
                                <CardHeader>
                                    {recipe.title}
                                </CardHeader>
                                <CardBody>
                                    <CardText>
                                        <strong>Ingredients:</strong><br />
                                        {recipe.ingredients}<br />
                                        <strong>Instructions:</strong><br />
                                        {recipe.instructions}
                                    </CardText>
                                    <Button color="warning" onClick={() => handleEdit(recipe)}>Edit</Button>{' '}
                                    <Button color="danger" onClick={() => openModal(recipe)}>Delete</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Confirm Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete the recipe "{recipeToDelete ? recipeToDelete.title : ''}"?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteRecipe}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}

export default RecipeList;
