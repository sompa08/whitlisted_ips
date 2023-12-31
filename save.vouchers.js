const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Inventories = require('./models/inventory');
const { encryptVoucher } = require('./util/encrypt.decrypt');
const app = express();



//enable CORS for all routes
app.use(cors());


// Middleware to parse JSON request bodies
app.use(express.json());


const upload = multer({ dest: 'uploads/' });

// Read the CSV file and save data in MongoDB
app.post('/upload', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ error: 'File Not Found!' })
  }
  res.status(202).send({ status: 202, message: 'File uploaded successfully' });
  // readDataFromFile(req.file.path);
  try {
    let csvDetails = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', async (jsonObj) => {
        csvDetails.push(jsonObj);
        const encryptedCardNumber = encryptVoucher(jsonObj.cardNumber);
        const encryptedPinCode = encryptVoucher(jsonObj.pinCode);
        const encryptedClaimUrl = encryptVoucher(jsonObj.claimUrl);
        jsonObj.cardNumber = encryptedCardNumber;
        jsonObj.pinCode = encryptedPinCode;
        jsonObj.claimUrl = encryptedClaimUrl;
        await Inventories.insertMany(jsonObj);
      })
      .on('end', () => {
        if (!csvDetails.length > 0) {
          return next({ status: 400, name: 'customerror', message: 'Please fill the data in the file!' });
        } else {
          console.info(`Vouchers ${JSON.stringify(csvDetails)} inserted successfully`);
        }
      });
  } catch (err) {
    return next({ status: 400, name: 'customerror', message: 'Corupted csv file' });
  }
});


// });
// let fileDelete = [path.resolve(path.resolve('.') + '/uploads/*')];
// deleteFile(fileDelete);


// Delete the file from the specified path
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File deleted successfully');
    }
  });
};

