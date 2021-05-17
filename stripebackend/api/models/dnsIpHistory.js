const mongoose = require('mongoose')

const dnsIpHistorySchema = mongoose.Schema({
    clientIp : String,
    dnsIpHistoryArray : [
        {dnsIp : String,}
    ]
})

module.exports = mongoose.model("DnsIpHistorySchema",dnsIpHistorySchema)