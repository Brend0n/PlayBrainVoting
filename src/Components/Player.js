import React, { Component } from "react";
import { countriesFlag } from "../assets/countries";

class Player extends Component {
  render() {
    return (
      <div
        className={
          "player-container " +
          (this.props.isSelected ? "selected" : "not-selected")
        }
        id={this.props.player.participantId}
        onClick={() => this.props.vote(this.props.player.participantId)}
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
        {this.props.isSelected ? (
          <span>SELECTED</span>
        ) : (
          <span>NOT SELECTED</span>
        )}

        <p>{this.props.player.message}</p>
      </div>
    );
  }
}

export default Player;
