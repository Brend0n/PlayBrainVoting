import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
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
    expect(wrapper.text()).toContain(
      "Vote for players to represent your region's team"
    );
  });
});
