const {google} = require("googleapis");
const {GoogleAuth} = require("google-auth-library");

let datas = [];
async function getSheetRows(){
  const auth = new GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  // Create client instance for auth
  const client = await auth.getClient();
  
  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  
  const spreadsheetId = "1jBkTwXHXCd0Dp9GYmJg0nd6h2Ni-0lRSlxm9O61sZh0";
  
  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  
  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });
  
  // console.log(getRows.data.values);
  return getRows.data.values;
}

// readSheet().then((res)=> {
//   datas = res;
//   for (x of datas) {
//     console.log(x);
//   }
// })
// setDatas = async () => {
//   datas = await readSheet();
//   for (const x of datas) {
//     console.log(x);
//   }
// }
// setDatas();

module.exports = getSheetRows;