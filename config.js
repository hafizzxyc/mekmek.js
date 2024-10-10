require("./database/module")

//GLOBAL PAYMENT
global.storename = "ᗩᴘɪssʙᴇɢɢᴀʀss"
global.dana = "083893485903"
global.qris = "https://telegra.ph/file/49f2b139a2aff4bb934f7.jpg"


// GLOBAL SETTING
global.owner = "6281360773542" //masukin no lu
global.namabot = "sɪɢᴍᴀ x ᴠᴇʀsɪᴏɴ"
global.nomorbot = "6282323738564" //masukin no lu
global.namaCreator = "ᗩᴘɪssʙᴇɢɢᴀʀss"
global.linkyt = "https://youtube.com/@hafizzelite"
global.autoJoin = false
global.antilink = false
global.versisc = '13.0.0'

// DELAY JPM
global.delayjpm = 5500

//GLOBAL THUMB

global.codeInvite = ""
global.imageurl = 'https://pomf2.lain.la/f/57383bj2.jpg'
global.isLink = 'https://hafizzxyc-xyzz.vercel.app/'
global.packname = "☳a҉p҉i҉i҉i҉s҉⼵⃟⃟⃟ཀᴠͥɪͣᴘͫͫ"
global.author = "☳a҉p҉i҉i҉s҉⼵⃟⃟⃟ཀᴠͥɪͣᴘͫͫ"
global.jumlah = "5"


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})