import './Favourite.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getFavourites } from '../../state/favourite/favourite';
import RecipeResumeCard from '../../shared/RecipeResumeCard/RecipeResumeCard';

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favourites: [...this.props.favourites]
     }
  }

  render() {
    return (
      <div className="container-fluid bg-light text-primary">
        <h1>My Favourites</h1>
        <div className="row mt-3">
          {this.state.favourites.map(recipe =>
            <div
              className="col-sm-6 col-md-3 col-xl-2 food-card nounderline"
              style={{ marginBottom: '30px' }}
              key={recipe.id}>
              <RecipeResumeCard {...recipe} isFavourite={this.props.favourites.findIndex(x => x.id === recipe.id) > -1} />
            </div>
          )}
        </div>
      </div>
    )
  };
}



export default connect(
  state => ({
    favourites: getFavourites(state)
  })
)(Favourites)