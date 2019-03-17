import React, { Component } from "react";
import "./App.css";

import { playersMock } from "./assets/players_teams";
import Player from "./Components/Player";
import { buildCountriesList } from "./Utils";
import { countriesDict } from "./assets/countries";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countriesList: buildCountriesList(),
      countrySelected: "japan",
      playerDisplayed: playersMock.filter(
        player => countriesDict[player.country] === "Japan"
      ),
      votes: []
    };
  }

  render() {
    return (
      <div className="App">
        <h2>Vote for players to represent your region's team</h2>
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
