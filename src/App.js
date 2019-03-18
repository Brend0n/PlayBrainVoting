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
    return (
      <div className="App">
        <div className="admin-menu">
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
        </div>

        {this.state.isVoteClosed ? (
          <div>
            <h2>Votation closed</h2>
            <p>Results of voting:</p>
            <div className="players-container">
              {playersMock.map((player, index) => {
                return (
                  <Player
                    player={player}
                    key={index}
                    isQualified={this.state.votes.includes(
                      player.participantId
                    )}
                    isSelected={false}
                    vote={() => {}}
                    isVoteClosed={true}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h2>Vote for players to represent your region's team</h2>
            <p />
            <CountriesMenu
              countries={this.state.countriesList}
              countrySelected={this.state.countrySelected}
              changeCountry={this.changeCountry}
            />
            <p id="vote-left">
              Click on up to 3 Players to place your votes. (
              {3 - this.state.votes.length} vote(s) remaining).
              <br />
              The remainder of your votes must be for{" "}
              {this.state.countrySelected}
            </p>
            <div className="players-container">
              {this.state.playerDisplayed.map((player, index) => {
                return (
                  <Player
                    player={player}
                    key={index}
                    isQualified={false}
                    isSelected={this.state.votes.includes(player.participantId)}
                    vote={this.vote}
                    isVoteClosed={false}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
