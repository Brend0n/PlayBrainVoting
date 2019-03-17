import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Player from "./Components/Player";

import { buildCountriesList } from "./Utils";

import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount } from "enzyme";
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
    expect(wrapper.find("h2").text()).toContain("Narvi");
  });
});

describe("The Utils function ", () => {
  it("should build a list a countries", () => {
    let countriesList = buildCountriesList();
    expect(countriesList.length).toEqual(4);
  });
});
