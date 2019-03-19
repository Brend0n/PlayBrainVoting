import React, { Component } from "react";
import { countriesFlag } from "../Assets/countries";
import "./Player.css";

class Player extends Component {
  render() {
    return (
      <div
        className={
          "player-container " +
          (this.props.isSelected || this.props.isVoteClosed
            ? ""
            : "player-on-hover")
        }
        onClick={() => this.props.vote(this.props.player.participantId)}
      >
        <div className="player-data">
          <div className="avatar-container">
            {this.props.showResult ? <span>{this.props.result}</span> : null}
            <img
              id={this.props.player.participantId}
              className={"avatar " + (this.props.isSelected ? "selected" : "")}
              alt={"Avatar Player " + this.props.player.nickname}
              src={this.props.player.avatarUrl}
            />
            {this.props.isSelected ? (
              <span className={"marker-selected"}>Selected</span>
            ) : null}
            {this.props.isQualified ? (
              <span className={"marker-qualified"}>Qualified</span>
            ) : null}
          </div>
          <div className="nickname-container">
            <span className="nickname">{this.props.player.nickname} </span>
            <img
              className="flag"
              alt={"flag " + this.props.player.country}
              src={countriesFlag[this.props.player.country]}
            />
          </div>
        </div>
        <p className="description">{this.props.player.message}</p>
      </div>
    );
  }
}

export default Player;
