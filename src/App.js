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

  changeCountry = country => {
    if (this.state.countrySelected !== country) {
      this.setState({
        countrySelected: country,
        votes: [],
        playerDisplayed: playersMock.filter(
          player => countriesDict[player.country] === country
        )
      });
    }
  };

  vote = participantId => {
    console.log("Vote for participant", participantId);
    if (
      !this.state.votes.includes(participantId) &&
      this.state.votes.length < 3
    ) {
      this.setState({
        votes: this.state.votes.concat(participantId)
      });
    }
  };

  render() {
    // console.log("COUNTRY", this.state.countriesList);
    return (
      <div className="App">
        <h2>Vote for players to represent your region's team</h2>
        <p id="vote-left">
          You have {3 - this.state.votes.length} vote(s) left
        </p>
        <CountriesMenu
          countries={this.state.countriesList}
          changeCountry={this.changeCountry}
        />
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
