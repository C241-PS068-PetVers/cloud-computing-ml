const express = require('express');
const bodyParser = require('body-parser');
const modelRoutes = require('./routes/modelRoutes');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use('/api/model', modelRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
