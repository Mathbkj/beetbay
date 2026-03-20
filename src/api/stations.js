const RadioBrowser = require("radio-browser");

const filter = {
  limit: 5,
};

export async function getStations() {
  const stations = await RadioBrowser.searchStations(filter);
  return stations;
}
