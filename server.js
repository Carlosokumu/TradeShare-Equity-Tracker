let RiskManagement = require("metaapi.cloud-sdk").RiskManagement;
let TrackerEventListener = require("metaapi.cloud-sdk").TrackerEventListener;

// your MetaApi API token
let token = process.env.TOKEN 
// the account must have field riskManagementApiEnabled set to true
let accountId = process.env.ACCOUNT_ID;




const riskManagement = new RiskManagement(token);
const riskManagementApi = riskManagement.riskManagementApi;

class TradeShareTrackerEventListener extends TrackerEventListener {
  async onTrackerEvent(trackerEvent) {
    console.log("tracker event received", JSON.stringify(trackerEvent));
  }

  async onError(error) {
    console.log("error event received", error);
  }
}

async function main() {
  try {
    // creating a tracker
    let trackerId = await riskManagementApi.createTracker(accountId, {
      name: "tradeshare-equity-tracker",
      absoluteDrawdownThreshold: 5,
      period: "day",
    });
    let trackerEventListener = new TradeShareTrackerEventListener(accountId, trackerId.id);
    riskManagementApi.addTrackerEventListener(trackerEventListener, accountId, trackerId.id);
   
  } catch (error) {
    console.log("error here:",error)
  }
}

main();
