const request = require('supertest');

console.log('Starting upload verification...');

request('http://localhost:3000')
  .post('/books/import')
  .attach('file', Buffer.from('title,author,publishedYear\nBulkBook,BulkAuthor,2022\nBulkBook2,BulkAuthor2,2023'), 'upl.csv')
  .expect(201)
  .then(res => {
     console.log('Upload Success:', res.body);
     if (res.body.importedCount === 2) {
         console.log('VERIFICATION PASSED');
     } else {
         console.log('VERIFICATION FAILED: Count mismatch');
         process.exit(1);
     }
  })
  .catch(err => {
      console.error('Upload Failed:', err);
      process.exit(1);
  });
