import React from "react";
import ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";

import App from "./App";
import Player from "./Components/Player";
import CountriesMenu from "./Components/CountriesMenu";
import { buildCountriesList } from "./Utils";

Enzyme.configure({ adapter: new Adapter() });

describe("rendering components", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("The root App component ", () => {
  it("should render the Title of the of the App", () => {
    const wrapper = mount(<App />);
    expect(
      wrapper.contains(
        <h2>Vote for players to represent your region's team</h2>
      )
    ).toBeTruthy();
  });

  it("should render the Player Component", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("Player")).toHaveLength(6);
  });

  it("should change the coutry selected when a country is clicked", () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().countrySelected).toEqual("Japan");
    wrapper.find("#China").simulate("click");
    expect(wrapper.state().countrySelected).toEqual("China");
  });

  it("should save votes when a user is clicked", () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().votes.length).toEqual(0);
    wrapper.find("#d5d603343b0bbbfdfb").simulate("click");
    expect(wrapper.state().votes.length).toEqual(1);
  });

  it("should display the number of votes left", () => {
    const wrapper = mount(<App />);
    wrapper.find("#vote-left").simulate("click");
    expect(wrapper.find("#vote-left").text()).toEqual(
      "You have 3 vote(s) left"
    );
    wrapper.find("#d5d603343b0bbbfdfb").simulate("click");
    expect(wrapper.find("#vote-left").text()).toEqual(
      "You have 2 vote(s) left"
    );
  });

  it("should reset the votes when a country is clicked", () => {
    const wrapper = mount(<App />);
    wrapper.find("#d5d603343b0bbbfdfb").simulate("click");
    wrapper.find("#China").simulate("click");
    expect(wrapper.state().votes.length).toEqual(0);
  });

  it("should not allowed more than 3 votes", () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().votes.length).toEqual(0);
    wrapper.find("#d5d603343b0bbbfdfb").simulate("click");
    wrapper.find("#sdf23339dd5d603343b0xcvx").simulate("click");
    wrapper.find("#aaaasd333389dd5d603343b0vvbbgg").simulate("click");
    wrapper.find("#fsd3334549dd5d603343b0zxzxzxx").simulate("click");
    expect(wrapper.state().votes.length).toEqual(3);
  });

  it("should display which user are selected", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("#d5d603343b0bbbfdfb").hasClass("selected")).toEqual(
      false
    );
    wrapper.find("#d5d603343b0bbbfdfb").simulate("click");
    expect(wrapper.find("#d5d603343b0bbbfdfb").hasClass("selected")).toEqual(
      true
    );
  });

  it("should have a button to switch user/admin", () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().isAdmin).toBeFalsy();
    wrapper.find("#user-switch").simulate("click");
    expect(wrapper.state().isAdmin).toBeTruthy();
  });

  it("should have a button to close the votes available when log as admin", () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists("#close-vote")).toBeFalsy();
    wrapper.find("#user-switch").simulate("click");
    expect(wrapper.exists("#close-vote")).toBeTruthy();
  });

  it("should have a button to close the votes", () => {
    const wrapper = mount(<App />);
    wrapper.find("#user-switch").simulate("click");
    expect(wrapper.state().isVoteClosed).toBeFalsy();
    wrapper.find("#close-vote").simulate("click");
    expect(wrapper.state().isVoteClosed).toBeTruthy();
  });

  it("should display the qualified player when vote is closed", () => {
    const wrapper = mount(<App />);
    wrapper.find("#d5d603343b0bbbfdfb").simulate("click");
    wrapper.find("#user-switch").simulate("click");
    wrapper.find("#close-vote").simulate("click");
    expect(wrapper.text()).toContain("Qualified");
  });
});

describe("The Player component ", () => {
  it("should render the NickName of the of the Player", () => {
    const mockUser = {
      participantId: "5a7483dbe55d603343b0hhhdfhdf",
      avatarUrl:
        "https://cdn.dekki.com/uploads/users/5a7483dbe589dd5d603343b0/avatar/original",
      nickname: "Narvi",
      message: "I'm the anchor/captain of the Singapore team",
      country: "sp"
    };
    const wrapper = mount(<Player player={mockUser} />);
    expect(wrapper.find(".nickname").text()).toContain("Narvi");
  });
});

describe("The CountriesMenu component ", () => {
  it("should render a Button for each country", () => {
    const countriesList = ["China", "Singapore", "Italy"];
    const wrapper = mount(<CountriesMenu countries={countriesList} />);
    expect(wrapper.text()).toContain("China");
    expect(wrapper.text()).toContain("Singapore");
    expect(wrapper.find("#Italy").text()).toEqual("Italy");
  });
});

describe("The Utils function ", () => {
  it("should build a list a countries", () => {
    let countriesList = buildCountriesList();
    expect(countriesList.length).toEqual(4);
  });
});
