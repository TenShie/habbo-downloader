const { fetchText, fetchMany } = require('../functions')
const { config, parseXml } = require('../utils')

async function parse (txt) {
  const all = await parseXml(txt)
  return new Set(
    all.map.effect.map((item) => item['@_lib'])
  )
}

async function handle () {
  const prod = await config('prod')

  const txt = await fetchText(`https://images.habbo.com/gordon/${prod}/effectmap.xml`)
  const all = await parse(txt)

  await fetchMany([...all].map((item) => {
    return {
      src: `https://images.habbo.com/gordon/${prod}/${item}.swf`,
      dst: `resource/gordon/${prod}/${item}.swf`
    }
  }))
}

module.exports = handle
