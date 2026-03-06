import * as cheerio from "cheerio";

export async function getLatestReleases() {
  const songs: {
    title: string;
    artist: string;
    imgSrc: string;
    audioSrc: string;
  }[] = [];
  const response = await fetch(process.env.POP_VORTEX_URL!);
  const text = await response.text();
  const $ = cheerio.load(text);
  const $items = $(".feed-item");
  $items.each((index, element) => {
    if (index >= 10) return false;
    const $songTitle = $(element).find("cite.title").text();
    const $artist = $(element).find("em.artist").text();
    const $imgSrc = $(element).find("img").attr("src");
    const $audioSrc = $(element).find("source").attr("src");

    songs.push({
      title: $songTitle,
      artist: $artist,
      imgSrc: $imgSrc!,
      audioSrc: $audioSrc!,
    });
  });
  return songs;
}
