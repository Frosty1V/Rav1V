let handler = m => m 
 handler.all = async function (m) { 
 let chat = global.db.data.chats[m.chat] 
  
 if (/^بوت/i.test(m.text) ) { 
     conn.reply(m.chat, `اسمي فروست`, m) 
 }
   if (/^سنو/i.test(m.text) ) { 
     conn.reply(m.chat, `اصبح اسمي فروست`, m) 

    }
if (/^فروست/i.test(m.text) ) {
    conn.reply(m.chat, `في شي تريده ؟`, m)
 }
       if (/بوت خرا/i.test(m.text) ) {
     conn.reply(m.chat, ` مش زيك `, m)

 }
         if (/مين عمك ؟/i.test(m.text) ) {
    conn.reply(m.chat, `سنو عمي`, m) 

}
            if (/بوت غبي/i.test(m.text) ) { 
       conn.reply(m.chat, `اهو انت `, m) 

   }
             if (/غبي/i.test(m.text) ) { 
        conn.reply(m.chat, ` انت الي غبي `, m)  

    }
            if (/تبا لك/i.test(m.text) ) {  
       conn.reply(m.chat, `ولك `, m) 

   }
            if(/اوامر/i.test(m.text) ) {
            
       conn.reply(m.chat,`اكتب قائمة`, m)
   }


  return !0 } 
 export default handler
