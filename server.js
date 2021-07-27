const htmlRoutes = require("./Develop/routes/htmlRoutes");
const apiRoutes = require("./Develop/routes/apiRoutes")
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./Develop/public'));

app.use("/api", apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  
