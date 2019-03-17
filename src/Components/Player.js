import React, { Component } from "react";
import { countriesFlag } from "../assets/countries";
import "./Player.css";

class Player extends Component {
  render() {
    return (
      <div
        className={
          "player-container " +
          (this.props.isSelected ? "selected" : "") +
          " " +
          (this.props.isQualified ? "qualified" : "")
        }
        id={this.props.player.participantId}
        onClick={() => this.props.vote(this.props.player.participantId)}
      >
        <div className="player-data">
          {this.props.showResult ? <span>{this.props.result}</span> : <div />}
          <img
            className="avatar"
            alt="Avatar Player"
            src={this.props.player.avatarUrl}
          />
          <div className="nickname-container">
            <span className="nickname">
              {this.props.player.nickname}{" "}
              <img
                className="flag"
                alt="Player Flag"
                src={countriesFlag[this.props.player.country]}
              />
            </span>
          </div>
          {this.props.isSelected ? (
            <span>SELECTED</span>
          ) : (
            <span>NOT SELECTED</span>
          )}

          <p>{this.props.player.message}</p>
        </div>
      </div>
    );
  }
}

export default Player;
