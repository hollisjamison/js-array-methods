const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const { pipeline } = require("stream/promises");

const generateDataSet = async () => {
  const data = [];
  try {
    await pipeline(
      fs.createReadStream("./data/data.csv"),
      csv.parse({ headers: true }),
      async function* (stream) {
        for await (object of stream) {
          data.push(object);
        }
      }
    )
  } catch (e) {
    console.error("Failed.", e);
  }

  return data;
};

module.exports = generateDataSet
