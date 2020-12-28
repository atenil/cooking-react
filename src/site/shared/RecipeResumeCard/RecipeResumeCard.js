import './RecipeResumeCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { mdiStarOutline, mdiStar } from '@mdi/js';
import Icon from '@mdi/react';
import { historyAddRecipe } from '../../state/history/history';
import { favouriteAdd, favouriteRemove } from '../../state/favourite/favourite';

class RecipeResumeCard extends React.Component {

  clickFavourite(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.isFavourite) {
      this.props.favouriteRemove(this.props.id)
    } else {
      this.props.favouriteAdd(this.props.id, this.props.title, this.props.image)
    }
  }

  render() {
    return (<Link
      to={"/recipe/" + this.props.id}
      onClick={() => this.props.historyAddRecipe(this.props.id, this.props.title, this.props.image)}>
      <Card bg="light">
        <Card.Img variant="top" src={this.props.image} />
        <Card.Body>
          <Card.Title className="text-reset">{this.props.title}</Card.Title>
        </Card.Body>
        <Button
          onClick={(e) => this.clickFavourite(e)}
          className={"position-absolute rounded-0 p-2 border-0 favourite-icon" + (this.props.isFavourite ? ' isFavourite' : '')}
          variant="outline-primary">
          <Icon path={this.props.isFavourite ? mdiStar : mdiStarOutline} style={{ height: '30px', width: '30px' }}></Icon>
        </Button>
      </Card>
    </Link>);
  }
}

export default connect(
  null,
  { historyAddRecipe, favouriteAdd, favouriteRemove }
)(RecipeResumeCard)