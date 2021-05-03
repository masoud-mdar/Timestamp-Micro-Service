const express = require('express');
const cors = require("cors")
const path = require("path")
require("dotenv").config()
const PORT = process.env.PORT || 5000
const app = express();
const router = express.Router()


app.use(cors())
app.use(express.static(path.join(__dirname, "../client", "build")))
app.use(express.static("public"))
app.use(express.json())
app.use(router)



app.get("/", function (req, res) {
})


app.get("/api/hello", function (req, res) {
  res.json({greeting: "hello API"})
});

router.post("/api/timestamp", async (req, res) => {

    let data = req.body.data.date

    if (!data) {
        let date = new Date().toUTCString();
        let unixFormat = Math.floor(new Date().getTime());
        res.json({unix: unixFormat, utc: date});
    } else {
        let rawParam = data;
        let regex = /\d{5,}/;
      
        if (regex.test(rawParam)){
      
          let numDate = parseInt(rawParam);
          var date = new Date(numDate).toUTCString();

          if (date === "Invalid Date"){
            res.json({error: date});
          }
          var unixFormat = parseInt(rawParam);
      
        } else{

            let dateStr = rawParam.toString();
            let dateArr = dateStr.split("-");
            let finalDateStr = dateArr.join(",");

            let firstDate = new Date(finalDateStr)
            firstDate.setHours(13)
            var date = firstDate.toUTCString();
            
            if (date === "Invalid Date"){
                res.json({error: date});
            }
            var unixFormat = Math.floor(new Date(finalDateStr).getTime());
      
        }
      
        res.json({unix:unixFormat, utc: date});
    }

})

app.get("/api", (req, res) => {
    console.log(req.body.data.date)
})

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
})


app.listen(process.env.PORT, function () {
  console.log(`server started on port ${PORT}` );
});
