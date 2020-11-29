import './Search.scss';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import fakeRecipes from './FakeRecipe';
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: fakeRecipes
    }
    console.log(fakeRecipes)
  }

  render() {
    return (
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-md-3 p-0">
            <ListGroup className="rounded-0 border-primary border-right border-bottom search-filter">
              <ListGroup.Item variant="secondary" className="border-right-0">Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item variant="secondary" className="border-right-0 border-bottom-0">Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-md-9">
            <div className="row">
              <InputGroup className="col-12 mt-3" style={{ marginBottom: '30px' }}>
                <FormControl className="border-primary"
                  placeholder="Rechercher..."
                  aria-label="Rechercher"
                />
                <InputGroup.Append>
                  <Button variant="outline-primary" className="py-0"><Icon path={mdiMagnify}></Icon></Button>
                </InputGroup.Append>
              </InputGroup>
              {this.state.recipes.map((recipe) => RecipeResumeCard(recipe))}
            </div>
          </div>
        </div>
      </div>
    )
  };
}

function RecipeResumeCard(recipe) {
  return (<div className="col-sm-6 col-md-4 col-xl-3" style={{ marginBottom: '30px' }}>
    <Card bg="light">
      <Card.Img variant="top" src={recipe.image} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>
  </div>);
}

export default Search;
