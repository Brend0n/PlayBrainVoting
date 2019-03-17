import React, { Component } from "react";
import { countriesFlag } from "../assets/countries";

class Player extends Component {
  render() {
    return (
      <div
        className="player-container"
        onClick={() => this.props.vote(this.props.player)}
      >
        {this.props.showResult ? <span>{this.props.result}</span> : <div />}
        <img alt="Avatar Player" src={this.props.player.avatarUrl} />
        <h2>
          {this.props.player.nickname}{" "}
          <img
            alt="Player Flag"
            src={countriesFlag[this.props.player.country]}
          />
        </h2>
        {this.props.isSelected ? <span>SELECTED</span> : <div />}

        <p>{this.props.player.message}</p>
      </div>
    );
  }
}

export default Player;
