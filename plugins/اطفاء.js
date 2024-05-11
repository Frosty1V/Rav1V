//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner }) => {
    const allowedUser = '+201127495892'; // Replace with the exact phone number of the user you want to allow

    // Check if the user is the owner, admin, ROwner, or the allowed user
    if (!(isAdmin || isOwner || isROwner || m.sender === allowedUser)) {
        return dfail('admin', m, conn);
    }

    global.db.data.chats[m.chat].isBanned = true;
    m.reply('*تـــم اطـفـاء راف فــي هـذا الـجروب*');
};

handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = ['اطفاء'];
handler.admin = true;
handler.owner = true;


export default handler;
