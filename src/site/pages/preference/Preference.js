import './Preference.scss';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { getIntolerances, intoleranceUpdate } from '../../state/preference/preference';

class Preferences extends React.Component {

  updateIntolerances(e) {
    this.props.intoleranceUpdate(e.target.id, e.target.checked);
  }

  render() {
    return (
      <div className="container-fluid bg-light text-primary">
        <h1>My Preferences</h1>
        <div className="row mt-3">
          <div className="offset-md-3 col-md-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center align-items-center mb-2">
                <hr className="border-primary m-2 w-100" />
                <p className="m-0">Allergies</p>
                <hr className="border-primary m-2 w-100" />
              </div>
            </div>
            <div className="row text-left">
              {Object.keys(this.props.intolerances).map(x =>
                <div className="col-6" key={x}>
                  <Form.Check
                    custom
                    type="checkbox"
                    id={x}
                    label={x}
                    onChange={(e) => this.updateIntolerances(e)}
                    checked={this.props.intolerances[x]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default connect(
  state => ({
    intolerances: getIntolerances(state)
  }),
  { intoleranceUpdate }
)(Preferences)