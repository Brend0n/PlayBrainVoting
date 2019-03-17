import React, { Component } from "react";
import "./App.css";

import { playersMock } from "./assets/players_teams";
import Player from "./Components/Player";
import CountriesMenu from "./Components/CountriesMenu";
import { buildCountriesList } from "./Utils";
import { countriesDict } from "./assets/countries";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countriesList: buildCountriesList(),
      countrySelected: "Japan",
      playerDisplayed: playersMock.filter(
        player => countriesDict[player.country] === "Japan"
      ),
      votes: []
    };
  }

  render() {
    console.log("COUNTRY", this.props.countriesList);
    return (
      <div className="App">
        <h2>Vote for players to represent your region's team</h2>
        <CountriesMenu countries={this.state.countriesList} />
        {this.state.playerDisplayed.map((item, index) => {
          return (
            <Player
              player={item}
              key={index}
              vote={this.vote}
              isSelected={() => {
                this.state.votes.includes(item.participantId);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
