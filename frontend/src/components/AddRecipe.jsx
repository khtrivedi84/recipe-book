import React, { useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';

const API_URL = process.env.REACT_APP_API_URL;

function AddRecipe({ addRecipe }) {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${API_URL}`, {
            title: title,
            ingredients: ingredients,
            instructions: instructions
        })
        .then(response => {
            addRecipe(response.data);
            setTitle('');
            setIngredients('');
            setInstructions('');
        })
        .catch(error => {
            console.error("There was an error adding the recipe!", error);
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
                        <Button type="submit" color="primary" block>Add Recipe</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddRecipe;
