import './Recipe.scss';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';
import HttpService from '../../../HttpService';
import FakeRecipeInstructions from '../../fakedatas/FakeRecipeInstructions';
import FakeRecipe from '../../fakedatas/FakeRecipe';
import { mdiLoading, mdiStarOutline, mdiStar } from '@mdi/js';
import Icon from '@mdi/react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { favouriteAdd, favouriteRemove, getFavourites } from '../../state/favourite/favourite';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: null,
      instructions: null
    }

    this.clickFavourite = this.clickFavourite.bind(this);
  }

  componentDidMount() {
    HttpService.get('/recipes/' + this.props.id + '/analyzedInstructions', {
      params: {
        stepBreakdown: true
      }
    }).then((result) => {
      const steps = result.data.find(x => x.name === "")?.steps
      this.setState({ instructions: steps ?? [] });
    }).catch((error) => {
      const steps = FakeRecipeInstructions.find(x => x.name === "")?.steps
      this.setState({ instructions: steps ?? [] });
    });

    HttpService.get('/recipes/' + this.props.id + '/information')
      .then((result) => {
        this.setState({ recipe: result.data });
      }).catch((error) => {
        this.setState({ recipe: FakeRecipe });
      });
  }

  clickFavourite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.favourites.findIndex(x => x.id === this.state.recipe.id) > -1) {
      this.props.favouriteRemove(this.state.recipe.id);
    } else {
      this.props.favouriteAdd(this.state.recipe.id, this.state.recipe.title, this.state.recipe.image);
    }
  }

  render() {
    return (
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-12" style={{ marginBottom: '30px', marginTop: '30px' }}>
            <Card bg="light">
              {this.state.recipe ?
                <Card.Body className="p-0">
                  <div className="container-fluid bg-light p-0">
                    <div className="row">
                      <div className="col-12 col-md-3">
                        <img className="img-fluid" src={this.state.recipe.image} alt="" />
                      </div>
                      <div className="col-12 col-md-9 p-3 text-left text-justify">
                        <Card.Title>
                          <Button
                            variant="outline-primary"
                            onClick={(e) => this.clickFavourite(e)}
                            className="border-0 shadow-none"
                            size="sm">
                            <Icon path={this.props.favourites.findIndex(x => x.id === this.state.recipe.id) > -1
                              ? mdiStar : mdiStarOutline}></Icon>
                          </Button>{this.state.recipe.title}</Card.Title>
                        <div dangerouslySetInnerHTML={{ __html: this.state.recipe.summary }} />
                      </div>
                    </div>
                  </div>
                </Card.Body>
                :
                <Card.Body>
                  <Icon className="text-primary" style={{ width: '100px' }} path={mdiLoading} spin={1}></Icon>
                </Card.Body>}
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3" style={{ marginBottom: '30px' }} >
            <Card bg="light">
              <Card.Header className="text-muted">Ingredients</Card.Header>
              <Card.Body className="p-0">
                <ListGroup variant="flush" className="bg-light">
                  {!this.state.recipe
                    ? <ListGroup.Item variant="light">
                      <Icon className="text-primary" path={mdiLoading} spin={1}></Icon>
                    </ListGroup.Item>
                    : this.state.recipe?.extendedIngredients.map((ingrediant) => Ingrediants(ingrediant))}
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
          <div className="col-12 col-md-9">
            {!this.state.instructions
              ? <Card bg="light" style={{ marginBottom: '30px' }}>
                <Card.Body>
                  <Card.Text>
                    <Icon className="text-primary" path={mdiLoading} spin={1}></Icon>
                  </Card.Text>
                </Card.Body>
              </Card>
              : this.state.instructions.length > 0
                ? this.state.instructions.map((instruction) => InstructionStep(instruction))
                : <Card bg="light" style={{ marginBottom: '30px' }}>
                  <Card.Body>
                    <Card.Text>
                      <div className="text-center text-muted">No recipe available</div>
                    </Card.Text>
                  </Card.Body>
                </Card>}
          </div>
        </div>
      </div >
    )
  };

}

function InstructionStep(props) {
  return (
    <Card bg="light" key={props.number} style={{ marginBottom: '30px' }}>
      <Card.Body>
        <Card.Text className="d-flex align-items-top">
          <div className="rounded-circle instruction-step-number bg-primary text-light d-flex align-items-center justify-content-center mr-2">{props.number}</div>
          <div className="text-justify text-muted align-self-center">{props.step}</div>
        </Card.Text>
      </Card.Body>
    </Card>);
}

function Ingrediants(props) {
  return (
    <ListGroup.Item key={props.id} variant="light">
      <div className="d-flex">
        <OverlayTrigger
          placement="right"
          overlay={
            <Popover>
              <Popover.Content>
                <img src={'https://spoonacular.com/cdn/ingredients_100x100/' + props.image} className="img-fluid" alt="" />
              </Popover.Content>
            </Popover>
          }
        ><div>{props.name} ({props.amount}{props.unit ? ' ' + props.unit : ''})</div>
        </OverlayTrigger>
      </div></ListGroup.Item>);
}


export default connect(
  state => ({
    favourites: getFavourites(state)
  }),
  { favouriteAdd, favouriteRemove }
)(Recipe);
