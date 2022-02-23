const fs = require("fs");
const http = require("http");
const requests = require("requests");


// reading html file
const pageData = fs.readFileSync("./index.html", "utf-8");

const replaceval = (orgvalue, realtimevale) => {
  let tempvalue = orgvalue.replace("{%city%}", realtimevale.name);
  tempvalue = tempvalue.replace("{%temp%}", realtimevale.main.temp);
  tempvalue = tempvalue.replace("{%min%}", realtimevale.main.temp_min);
  tempvalue = tempvalue.replace("{%max%}", realtimevale.main.temp_max);
  return tempvalue;
};

http
  .createServer((req, res) => {
 
   
    requests(
      `https://api.openweathermap.org/data/2.5/weather?q=Buxar&units=metric&appid=ba8ef98dc79e44cd892ec6958a7fe9c8`
    )
      .on("data", (chunk) => {
        let objData = JSON.parse(chunk);
        let arrData = [objData];

        const realTimeData = arrData
          .map((val) => replaceval(pageData, val))
          .join("");
        res.write(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  })
  .listen(8000);

