import { google } from 'googleapis';
import serviceAccount from '../service-account.json' assert { type: 'json' };

// const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });



async function addToGoogleSheet(name, email) {

  

  console.log("data:", name);
  
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: '1fkzgJxc4EYMgN3hsnc365LUAfDbV6omSRjCIHATbFg4',
      range: 'Sheet1!A2',   // ✅ starting cell
      valueInputOption: 'USER_ENTERED',
      resource: { values: [[name, email]] }, // ✅ data should be 2D array
    });
    console.log('Data added successfully!', name, email);
  } catch (error) {
    // console.error(error);
  }

  console.log('Data added successfully!', name, email);
}

// addToGoogleSheet([name,email]);
// Usage
export default addToGoogleSheet;