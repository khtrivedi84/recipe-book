import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';

const API_URL = process.env.REACT_APP_API_URL;

function EditRecipe({ recipe, updateRecipe, cancelEdit }) {
    const [title, setTitle] = useState(recipe.title);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`${API_URL}${recipe.id}`, {
            title: title,
            ingredients: ingredients,
            instructions: instructions
        })
        .then(response => {
            updateRecipe(response.data);
        })
        .catch(error => {
            console.error("There was an error updating the recipe!", error);
        });
    };

    return (
        <Container className="mb-4">
            <Row>
                <Col md="12">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ingredients">Ingredients</Label>
                            <Input
                                type="textarea"
                                name="ingredients"
                                id="ingredients"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="instructions">Instructions</Label>
                            <Input
                                type="textarea"
                                name="instructions"
                                id="instructions"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <Button type="submit" color="primary" block>Update Recipe</Button>
                        <Button color="secondary" block onClick={cancelEdit}>Cancel</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditRecipe;
