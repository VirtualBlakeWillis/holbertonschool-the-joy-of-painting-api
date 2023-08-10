const mysql = require('mysql2');
const fs = require('fs');
const csv = require('csv-parser');

// csv files
const colors_used = './data/jop-colors_used.csv';
const episode_dates = './data/jop-episode_dates.txt';
const subject_matter = './data/jop-subject_matter.csv';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'joy_of_painting',
  multipleStatements: true
});

function parseColumnTitles(data, startingIndex) {
  let titles = [];
  for (let i = startingIndex; i < data.length; i++) {
    titles.push(data[i]);
  }
  return titles;
}
// Call the functions to read and merge data from files

function makeColorsTable() {
  return new Promise((resolve, reject) => {
    fs.readFile(colors_used, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading CSV file:', err);
        reject(err);
      }
      // Parse the CSV data and extract rows
      const rows = data.trim().split('\n').map(row => row.split(','));
      colors_list = parseColumnTitles(rows[0], 10);

      const sql = "INSERT INTO colors (color_name) VALUES ?";
      connection.query(sql, [colors_list], (err, results, fields) => {
        if (err) {
          console.error('Error executing SQL script:', err);
          return;
        }
        console.log('SQL script executed successfully.');
      });

      resolve(true);
    });
  });
}

function makeSubjectMatterTable() {
  return new Promise((resolve, reject) => {
    fs.readFile(subject_matter, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading CSV file:', err);
        reject(err);
      }
      // Parse the CSV data and extract rows
      const rows = data.trim().split('\n').map(row => row.split(','));
      subject_matter_list = parseColumnTitles(rows[0], 2);

      const sql = "INSERT INTO subject_matter (subject_matter_name) VALUES ?";
      connection.query(sql, [subject_matter_list], (err, results, fields) => {
        if (err) {
          console.error('Error executing SQL script:', err);
          return;
        }
        console.log('SQL script executed successfully.');
      });
      resolve(true);
    });
  });
}


function convertStringToDate(string) {
  return new Date(string).toLocaleDateString();
}

// Read colors used for episodes table
function colorsUsedforEpisodes() {
  return new Promise((resolve, reject) => {
    fs.readFile(colors_used, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading CSV file:', err);
        reject(err);
      }
      // Parse the CSV data and extract rows
      const rows = data.trim().split('\n').map(row => row.split(','));
      const rows_colors = data.trim().split('\n').map(row => row.split('['));
      console.log(rows[1]);
      let episodes = [];
      let episode = [];
      /*
      img_src - 2, title - 3, season - 4, episode - 5, youtube_url - 7

      Colors columns: 10-27
      */
      for (item in rows) {
        if (item != 0) {
          episode = [];
          episode.push(rows[item][3], rows[item][4], rows[item][5], rows[item][2], rows[item][7]);
  
          episodes.push(episode);
        }
      }
      resolve(episodes);
    });
  });
};

function datesForEpisodes() {
  return new Promise((resolve, reject) => {
    fs.readFile(episode_dates, 'utf8', (err, data) => {

      if (err) {
        console.error('Error reading text file:', err);
        reject(err);
      }
      // Parse the text data and extract rows
      const rows = data.trim().split('\n').map(row => row.split('('));
      let item_date = "";
      dates = [];
      for (item in rows) {
        item_date = convertStringToDate(rows[item][1].split(')')[0]);
        dates.push(item_date);
      }
      resolve(dates);
    });
  });
}

function mergeData(data1, data2) {

  for (item in data1) {
    data1[item].push(data2[item]);
  }
  return data1;
  // Merge the two arrays of arrays and return the final array
  // Example:
  // return dataFromFile1.concat(dataFromFile2);
}

function makeEpisodesTable() {
  Promise.all([colorsUsedforEpisodes(), datesForEpisodes()])
    .then(([colors_data, dates_data]) => {
      const mergedData = mergeData(colors_data, dates_data);
      console.log(mergedData[mergedData.length - 3]);
      const sql = "INSERT INTO episodes (title, season_number, episode_number, painting_img_src, painting_yt_src, air_date) VALUES ?";

      connection.query(sql, [mergedData], (err, results, fields) => {
        if (err) {
          console.error('Error executing SQL script:', err);
          return;
        }
        console.log('SQL script executed successfully.');
      });
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}

/*
makeColorsTable();
makeSubjectMatterTable();
*/
makeEpisodesTable();



async function testCSV() {
  const csv = require('csv-parser')
  const fs = require('fs')
  const results = [];
  const headers = []

  fs.createReadStream('data/jop-colors_used.csv')
    .pipe(csv())
    .on('data', (data) => {
      modified_data = [];
      try {
        modified_data.push(data.id, data.painting_title, data.season, data.episode, data.youtube_src)
        results.push(modified_data);
      }
      catch (err) {
        results.push([NULL,NULL,NULL,NULL,NULL])
        console.log(err);
      }
    })
    .on('end', () => {
      console.log(results);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
}
