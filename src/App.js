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
      votes: [],
      isAdmin: false,
      isVoteClosed: false
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
        {this.state.isAdmin ? (
          <button
            id="close-vote"
            onClick={() => {
              this.setState({ isVoteClosed: true });
            }}
          >
            Close Votation
          </button>
        ) : null}

        <button
          id="user-switch"
          onClick={() => {
            this.setState({
              isAdmin: !this.state.isAdmin
            });
          }}
        >
          {this.state.isAdmin ? "Switch to User" : "Switch to Admin"}
        </button>

        <CountriesMenu
          countries={this.state.countriesList}
          countrySelected={this.state.countrySelected}
          changeCountry={this.changeCountry}
        />
        {this.state.isVoteClosed ? (
          <div>
            {playersMock.map((player, index) => {
              return (
                <Player
                  player={player}
                  key={index}
                  isQualified={this.state.votes.includes(player.participantId)}
                />
              );
            })}
          </div>
        ) : (
          <div>
            {this.state.playerDisplayed.map((player, index) => {
              return (
                <Player
                  player={player}
                  key={index}
                  vote={this.vote}
                  isSelected={this.state.votes.includes(player.participantId)}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default App;
