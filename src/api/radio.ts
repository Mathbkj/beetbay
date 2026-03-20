import {RadioBrowserApi} from 'radio-browser-api';

const api = new RadioBrowserApi("my-music-app");

export async function getRadioStations() {
    const stations = await api.searchStations({countryCode: "US", limit: 10, hideBroken: true});
    return stations;
}