const mongoose = require('mongoose');

const imdbController = require('./sites/imdb');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/scrap', {useNewUrlParser: true});

// create scrap model
const scrapModel = mongoose.model('Scrap', { title: String, rating: String, ratingCount: String });

process.on('exit', function(code) {  
    return console.log(`About to exit with code ${code}`);
});

imdbController.craw(scrapModel)
.then((data) => {
  const newEntry = new scrapModel({
    title: data.title, 
    rating: data.rating, 
    ratingCount: data.ratingCount
  });
  newEntry.save();
  console.log('ends');
  process.exit();
})
.catch((error) => {
  console.log('error', error);
  process.exit();
});
