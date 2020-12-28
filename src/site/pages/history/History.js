import './History.scss';
import React from 'react';
import { connect } from 'react-redux';
import { getHistorySearchs } from '../../state/history/history';
import { getHistoryRecipes } from '../../state/history/history';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchHistory: true
    }
  }

  changeHistoryType(type) {
    this.setState({ isSearchHistory: type });
  }

  render() {
    return (
      <div className="container-fluid bg-light text-primary">
        <h1>My History</h1>
        <div className="row">
          <div className="col-md-3">
            <ButtonGroup size="lg" className="mb-2">
              <Button variant="outline-primary" className={this.state.isSearchHistory ? 'active' : ''} onClick={() => this.changeHistoryType(true)}>Search History</Button>
              <Button variant="outline-primary" className={this.state.isSearchHistory ? '' : 'active'} onClick={() => this.changeHistoryType(false)}>Recipe History</Button>
            </ButtonGroup>
          </div>
          <div className="col-md-9">
            {this.state.isSearchHistory
              ? this.props.searchs.map(x =>
                <div className="row">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <p className="m-0">{x.date.toLocaleDateString()}</p>
                    <hr className="border-primary ml-2 w-100" />
                  </div>
                  <div className="col-12 mb-3">
                    {x.searchs.map(y =>
                      <div
                        className="ml-md-2 d-flex justify-content-center mb-2"
                        key={y.date}>
                        <p className="mr-2 my-auto">{y.date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:{y.date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</p>
                        <Link to={"/search?search=" + y.search} className="w-100 text-left text-reset text-primary nounderline">
                          <Card bg="light">
                            <Card.Body className="p-2">
                              <Card.Text>{y.search}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>)
              : this.props.recipes.map(x =>
                <div className="row">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <p className="m-0">{x.date.toLocaleDateString()}</p>
                    <hr className="border-primary ml-2 w-100" />
                  </div>
                  <div className="col-12 mb-3">
                    {x.recipes.map(y =>
                      <div className="ml-md-2 d-flex justify-content-center mb-2">
                        <p className="mr-2 my-auto">{y.date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:{y.date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</p>
                        {<Link
                          to={"/recipe/" + y.id}
                          key={y.date}
                          className="w-100 text-left text-reset text-primary nounderline">
                          <Card bg="light">
                            <Card.Body className="p-0">
                              <div className="container-fluid bg-light">
                                <div className="row">
                                  <div className="col-md-1 px-0 d-none d-md-block">
                                    <img className="img-fluid" src={y.image} alt="" />
                                  </div>
                                  <Card.Text className="col-12 col-md-11 p-2 text-left text-justify d-flex align-items-center">
                                    {y.title}
                                  </Card.Text>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>}
                      </div>
                    )}
                  </div>
                </div>)}
          </div>
        </div>
      </div>
    )
  };
}

export default connect(
  state => ({
    searchs: getHistorySearchs(state)
      .sort((a, b) => a.date < b.date)
      .reduce((r, x) => {
        var thisDay = r.find(y =>
          x.date.getFullYear() === y.date.getFullYear()
          && x.date.getMonth() === y.date.getMonth()
          && x.date.getDate() === y.date.getDate());
        if (thisDay) {
          thisDay.searchs.push(x)
        } else {
          r.push({
            date: x.date,
            searchs: [x]
          })
        }
        return r;
      }, []),
    recipes: getHistoryRecipes(state)
      .sort((a, b) => a.date < b.date)
      .reduce((r, x) => {
        var thisDay = r.find(y =>
          x.date.getFullYear() === y.date.getFullYear()
          && x.date.getMonth() === y.date.getMonth()
          && x.date.getDate() === y.date.getDate());
        if (thisDay) {
          thisDay.recipes.push(x)
        } else {
          r.push({
            date: x.date,
            recipes: [x]
          })
        }
        return r;
      }, [])
  })
)(History)
