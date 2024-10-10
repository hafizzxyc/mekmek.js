
require("./database/global")

const func = require("./database/place")
const readline = require("readline");
const usePairingCode = true
const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};

async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.red.bold('Sc By Qiuu Offc'))
const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "fatal" }),
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]   
// browser: ['Chrome (Linux)', '', '']
}
const apiis = func.makeWASocket(connectionOptions)
if(usePairingCode && !apiis.authState.creds.registered) {
		const phoneNumber = await question(chalk.green('\nEnter Your Number\nNumber : '));
		const code = await apiis.requestPairingCode(phoneNumber.trim())
		console.log(chalk.green(`Your Pairing Code : ${code} `))

	}
store.bind(apiis.ev)

apiis.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
apiis.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
apiis.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
apiis.sendMessage(`6281360773542@s.whatsapp.net`, { text: `\`𝗛𝗶 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿\`
  Bot Succes Connecting`})
if (autoJoin) {
apiis.groupAcceptInvite(codeInvite)
}
}
})

apiis.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return apiis.readMessages([m.key])
if (!apiis.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(apiis, m, store)
require("./apiis")(apiis, m, store)
} catch (err) {
console.log(err)
}
})

apiis.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = apiis.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})


apiis.public = true

apiis.ev.on('creds.update', saveCreds)
return apiis
}

startSesi()

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})