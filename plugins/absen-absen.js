let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*Tidak Ada Sesi Absensi Yang Sedang Berlangsung Digrup Ini!*_\n\n*${usedPrefix}mulaiabsen* - Untuk Memulai Absen`

    let absen = conn.absen[id][1]
    const wasVote = absen.includes(m.sender)
    if (wasVote) throw '*Kamu Sudah Absen -_*'
    absen.push(m.sender)
    m.reply(`Done!`)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    conn.reply(m.chat, `*「 ABSEN 」*
Tanggal : ${date}
${conn.absen[id][2]}
┌ *List :*
│ 
│ Total: ${absen.length}
${list}
│ 
└────
*「 ABSEN 」*`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['absen']
handler.tags = ['absen']
handler.command = /^(absen|hadir)$/i
handler.group = true
module.exports = handler
