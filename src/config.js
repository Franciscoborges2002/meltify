require('dotenv').config()

module.exports = {
    accountName: process.env.ACCOUNT_NAME,
    password: process.env.ACCOUNT_PASSWORD,
    sharedSecret: process.env.ACCOUNT_SHARED_SECRET,
    identitySecret: process.env.ACCOUNT_IDENTITY_SECRET,

    minimumScrap: 5,
    minimumReclaimed: 5,
    minimumRefined: 5,

    scrapWanted: 5,
    reclaimedWanted: 5,
    refinedWanted: 5,
}