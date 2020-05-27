const cheerio = require("cheerio");
const { getHtml } = require("./html");
const { BASE_URL } = require("./constant");

const getData = async () => {
  const html = await getHtml(BASE_URL);
  const $ = cheerio.load(html);

  // global
  const global = {};
  global.country = parseNumber(
    $(
      "#case > div > div > div > div > div:nth-child(1) > div:nth-child(3) > strong"
    ).text()
  );
  global.confirmed = parseNumber(
    $(
      "#case > div > div > div > div > div:nth-child(1) > div:nth-child(4) > strong"
    ).text()
  );
  global.death = parseNumber(
    $(
      "#case > div > div > div > div > div:nth-child(1) > div:nth-child(5) > strong"
    ).text()
  );
  const noteGlobal = $(
    "#case > div > div > div > div > div:nth-child(1) > div.pt-4.text-color-grey.text-1"
  ).text();
  if (noteGlobal) {
    const prefix = `Update Terakhir: `;
    const suffix = ` | Sumber`;
    const match = noteGlobal.match(new RegExp(`${prefix}(.*?)${suffix}`, "i"));
    if (match && match.length > 1) {
      global.lastUpdate = match[1];
    }
  }

  // Indonesia
  const indonesia = {};
  indonesia.positive = parseNumber(
    $(
      "#case > div > div > div > div > div:nth-child(2) > div:nth-child(3) > strong"
    ).text()
  );
  indonesia.recovered = parseNumber(
    $(
      "#case > div > div > div > div > div:nth-child(2) > div:nth-child(4) > strong"
    ).text()
  );
  indonesia.death = parseNumber(
    $(
      "#case > div > div > div > div > div:nth-child(2) > div:nth-child(5) > strong"
    ).text()
  );
  const noteIndo = $(
    "#case > div > div > div > div > div:nth-child(2) > div.pt-4.text-color-black.text-1"
  ).text();
  if (noteIndo) {
    indonesia.lastUpdate = noteIndo
      .split("Update Terakhir: ")
      .join("")
      .split("\n")
      .join("");
  }

  return { global, indonesia };
};

const parseNumber = (value) => {
  const raw = value.split(".").join("");
  return parseInt(raw);
};

// getData().then(console.log).catch(console.log);
module.exports = {getData}
