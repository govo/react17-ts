var fs = require('fs')

function conver (path) {
  const buffer = fs.readFileSync(path)
  const arr = []
  // let match = 0
  for (let i of buffer) {
    if (i === 0xD) {
      i = 0xA
    }
    if (i === 0x20) { // fix 0xD0x20
      i = 0xA
    }
    arr.push(i)
  }
  return Buffer.from(arr).toString('utf8')
}

console.log('process.argv:', process.argv.slice(2))
const file = process.argv.slice(2)[0]

function converFile (path) {
  const content = conver(path)
  console.log('convert:', content)
  fs.writeFileSync(path, content)
}
if (file) {
  converFile(file)
}

module.exports = conver
