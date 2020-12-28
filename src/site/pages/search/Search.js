import './Search.scss';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Icon from '@mdi/react';
import { mdiLoading, mdiMagnify } from '@mdi/js';
import React from 'react';
import HttpService from '../../../HttpService';
import RecipeResumeCard from '../../shared/RecipeResumeCard/RecipeResumeCard';
import { connect } from 'react-redux';
import { historyAddSearch } from '../../state/history/history';
import { useLocation } from 'react-router-dom'
import { getFavourites } from '../../state/favourite/favourite';
import FakeSearch from '../../fakedatas/FakeSearch';
import { Range } from 'rc-slider';
import { getIntolerances } from '../../state/preference/preference';

const MIN_CALORIES = 50;
const MAX_CALORIES = 800;
const MIN_FAT = 1;
const MAX_FAT = 100;
const MIN_SUGAR = 1;
const MAX_SUGAR = 100;

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: '',
      loading: true,
      minCalories: MIN_CALORIES,
      maxCalories: MAX_CALORIES,
      minFat: MIN_FAT,
      maxFat: MAX_FAT,
      minSugar: MIN_SUGAR,
      maxSugar: MAX_SUGAR,
      intolerances: { ...this.props.intolerances },
      numberOfRecipes: 0,
      recipes: [],
      search: props.search,
      lastSearch: props.search,
      totalResults: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.searchRecipe = this.searchRecipe.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.searchRecipe();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.getElementById('SearchResults').offsetHeight) {
      if (!this.state.loading) {
        this.searchRecipe(false);
      }
    }
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  onKeyPress(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.searchRecipe();
    }
  }

  searchRecipe(resetResult = true) {
    const search = this.state.search;
    const numberOfRecipes = resetResult ? 0 : this.state.numberOfRecipes;
    if (resetResult || this.state.numberOfRecipes !== this.state.totalResults) {
      this.setState({ loading: true });
      HttpService.get('/recipes/complexSearch', {
        params: {
          addRecipeInformation: true,
          query: search,
          offset: numberOfRecipes,
          minFat: this.state.minFat,
          maxFat: this.state.maxFat,
          minCalories: this.state.minCalories,
          maxCalories: this.state.maxCalories,
          minSugar: this.state.minSugar,
          maxSugar: this.state.maxSugar,
          intolerances: Object.keys(this.state.intolerances).filter(x => !this.state.intolerances[x]).join(','),
          number: 12
        }
      }).then((result) => {
        this.setSearchResultInState(search, numberOfRecipes, result.data);
      }).catch((error) => {
        this.setSearchResultInState(search, numberOfRecipes, FakeSearch);
      });
    }
  }

  setSearchResultInState(search, numberOfRecipes, data) {
    this.setState((state) => ({
      recipes: numberOfRecipes === 0
        ? data.results
        : [...state.recipes, ...data.results],
      loading: false,
      lastSearch: search,
      numberOfRecipes: numberOfRecipes + data.results.length,
      totalResults: data.totalResults
    }));
    if (this.state.search && data.results.length > 0) {
      this.props.historyAddSearch(this.state.search);
    }
  }

  updateIntolerances(e) {
    const intolerances = { ...this.state.intolerances };
    intolerances[e.target.id] = e.target.checked;
    this.setState({ intolerances }, this.searchRecipe);
  }

  render() {
    return (
      <div className="container-fluid bg-light">
        <div className="row">
          <div className={"p-0 transition col-md-" + (this.state.showFilter ? '3' : '1')}>
            <ListGroup className="rounded-0 border-primary border-right border-bottom search-filter">
              <Accordion className="search-filter" activeKey={this.state.showFilter} onSelect={(accordionId) => this.setState({ showFilter: accordionId })}>
                <Accordion.Collapse eventKey="0">
                  <div>
                    <RangeFilter
                      name="Calories"
                      lowValue={this.state.minCalories}
                      upValue={this.state.maxCalories}
                      min={MIN_CALORIES}
                      max={MAX_CALORIES}
                      search={this.searchRecipe}
                      onChange={(values) => this.setState({ minCalories: values[0], maxCalories: values[1] })}
                    />
                    <RangeFilter
                      name="Fat (per gram)"
                      lowValue={this.state.minFat}
                      upValue={this.state.maxFat}
                      min={MIN_FAT}
                      max={MAX_FAT}
                      search={this.searchRecipe}
                      onChange={(values) => this.setState({ minFat: values[0], maxFat: values[1] })}
                    />
                    <RangeFilter
                      name="Sugar (per gram)"
                      lowValue={this.state.minSugar}
                      upValue={this.state.maxSugar}
                      min={MIN_SUGAR}
                      max={MAX_SUGAR}
                      search={this.searchRecipe}
                      onChange={(values) => this.setState({ minSugar: values[0], maxSugar: values[1] })}
                    />
                    <ListGroup.Item variant="secondary" className="border-right-0">
                      <p>Allergies</p>
                      <div className="row text-left">
                        {Object.keys(this.state.intolerances).map(x =>
                          <div className="col-6" key={x}>
                            <Form.Check
                              custom
                              type="checkbox"
                              id={x}
                              label={x}
                              onChange={(e) => this.updateIntolerances(e)}
                              checked={this.state.intolerances[x]}
                            />
                          </div>
                        )}
                      </div>
                    </ListGroup.Item>
                  </div>
                </Accordion.Collapse>
                <Accordion.Toggle as={ListGroup.Item} eventKey="0" variant="secondary" className="search-filter px-0 btn btn-primary">
                {this.state.showFilter ? 'Hide ' : 'Show '}filters
                </Accordion.Toggle>
              </Accordion>
            </ListGroup>
          </div>
          <div className={"transition col-md-" + (this.state.showFilter ? '9' : '11')}>
            <div className="row px-2" id="SearchResults">
              <InputGroup className="col-12 mt-3" style={{ marginBottom: '30px' }}>
                <FormControl className="border-primary"
                  placeholder="Search..."
                  aria-label="Search"
                  value={this.state.search}
                  onChange={this.handleChange}
                  onKeyPress={this.onKeyPress}
                />
                <InputGroup.Append>
                  <Button variant="outline-primary" className="py-0" onClick={this.searchRecipe}><Icon path={mdiMagnify}></Icon></Button>
                </InputGroup.Append>
              </InputGroup>
              {this.state.recipes.map((recipe) =>
                <div
                  className="col-sm-6 col-md-4 col-xl-3 food-card nounderline"
                  style={{ marginBottom: '30px' }}
                  key={recipe.id}>
                  <RecipeResumeCard {...recipe} isFavourite={this.props.favourites.findIndex(x => x.id === recipe.id) > -1} />
                </div>)}
              {this.state.recipes.length === 0 && !this.state.loading ?
                <p className="text-center text-primary col-12">No Result</p>
                : this.state.numberOfRecipes === this.state.totalResults
                  ? <p className="text-center text-primary col-12">No more recipes</p>
                  : <div className="text-center col-12">
                    <Icon className="text-primary" style={{ width: '50px' }} path={mdiLoading} spin={1}></Icon>
                  </div>
              }
            </div>
          </div>
        </div>
      </div >
    )
  };
}

function Search(props) {
  var query = new URLSearchParams(useLocation().search);
  return <SearchPage
    search={query.get("search") ?? ''}
    histories={props.histories}
    historyAddSearch={props.historyAddSearch}
    favourites={props.favourites}
    intolerances={props.intolerances} />
}

function RangeFilter(props) {
  return <ListGroup.Item variant="secondary" className="border-right-0">
    <p>{props.name}</p>
    <div className="d-flex align-items-center">
      <input
        className="form-control form-control-sm text-center"
        style={{ maxWidth: '40px' }}
        type="number" value={props.lowValue}
        onChange={(e) => !isNaN(parseInt(e.target.value))
          && e.target.value >= props.min
          && e.target.value <= props.upValue
          && props.onChange([e.target.value, props.upValue])} />
      <Range
        className="mx-3"
        allowCross={false}
        min={props.min}
        max={props.max}
        value={[props.lowValue, props.upValue]} onChange={(values) => props.onChange(values)}
        onAfterChange={() => props.search()} />
      <input
        className="form-control form-control-sm text-center"
        style={{ maxWidth: '40px' }}
        type="number" value={props.upValue}
        onChange={(e) => !isNaN(parseInt(e.target.value))
          && e.target.value >= props.lowValue
          && e.target.value <= props.max
          && props.onChange([props.lowValue, e.target.value])} />
    </div>
  </ListGroup.Item>
}

export default connect(
  state => ({
    favourites: getFavourites(state),
    intolerances: getIntolerances(state)
  }),
  { historyAddSearch }
)(Search)