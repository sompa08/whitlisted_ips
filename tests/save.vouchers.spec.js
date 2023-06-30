const fs = require('fs');
const csv = require('csv-parser');
const { Vouchers } = require('../models/vouchers');
const supertest = require('supertest');
const server = require('./server');

const requestWithSupertest = supertest(server);


jest.mock('../models/vouchers', () => ({
  Vouchers: {
    insertMany: jest.fn(),
  },
}));

describe('POST /upload', () => {
  it('should return 400 if no file is provided', async () => {
    const response = await requestWithSupertest

      .post('/upload');
    expect(response.body).toEqual({ error: 'File Not Found!' });
  });

  it('should return 202 and upload file successfully', async () => {
    const fileData =
      { "orderId": "647767", "vendorId": "3625352763", "cardNumber": "ZNNPZRRYP49VT9UK", "pinCode": "3.93145E+17", "claimUrl": "https://vc.ezpaypin.com/9853476c-3b05-4871-a56f-9bb7eb33891d", "expiryDate": "425343625" }
      ;
    const filePath = 'uploads/test.csv';
    let csvDetails = [];
    // fs.writeFileSync(filePath, convertToCSV(fileData));
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (fileData) => {
        csvDetails.push(fileData);
        // const savedVouchers = Vouchers.insertMany(jsonObj);
      });
    const response = await requestWithSupertest
      .post('/upload')
      .attach('file', filePath);
    // .expect(202);
    console.log(response.body);
    expect(response.body).toEqual({ status: 202, message: 'File uploaded successfully' });
    expect(Vouchers.insertMany).toHaveBeenCalledWith(fileData);

    // Delete the test file after the test
    fs.unlinkSync(filePath);
  });

  it('should return 400 if CSV file is corrupted', async () => {
    const corruptedFilePath = 'uploads/test.csv';
    fs.createReadStream(filePath)
      .pipe(csv());

    const response = await requestWithSupertest
      .post('/upload')
      .attach('file', corruptedFilePath)
      .expect(400);

    expect(response.body).toEqual({ status: 400, name: 'customerror', message: 'Corrupted csv file' });

    // Delete the corrupted test file after the test
    fs.unlinkSync(corruptedFilePath);
  });

  it('should return 400 if CSV file is empty', async () => {
    const emptyFilePath = 'uploads/test.csv';
    fs.writeFileSync(emptyFilePath, '');

    const response = await requestWithSupertest
      .post('/upload')
      .attach('file', emptyFilePath)

    expect(response.body).toEqual({ status: 400, name: 'customerror', message: 'Please fill the data in the file!' });

    // Delete the empty test file after the test
    fs.unlinkSync(emptyFilePath);
  });
});

