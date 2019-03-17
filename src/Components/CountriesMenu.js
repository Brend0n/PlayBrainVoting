import React, { Component } from "react";

class CountriesMenu extends Component {
  render() {
    return (
      <div>
        {this.props.countries.map((country, index) => {
          return (
            <button
              onClick={() => this.props.changeCountry(country)}
              key={index}
            >
              {country}
            </button>
          );
        })}
      </div>
    );
  }
}

export default CountriesMenu;
