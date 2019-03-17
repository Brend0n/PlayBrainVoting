import { countriesDict } from "./assets/countries";
import { playersMock } from "./assets/players_teams";

function buildCountriesList() {
  let tempCountries = [];
  for (let player of playersMock) {
    if (!tempCountries.includes(countriesDict[player.country])) {
      tempCountries.push(countriesDict[player.country]);
    }
  }
  return tempCountries;
}

export { buildCountriesList };
