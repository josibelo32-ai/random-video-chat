# Random Video Chat (ፕሮቶታይፕ)

## በኮምፒውተርህ ላይ ለመሞከር
1. Node.js ጫን: https://nodejs.org
2. በዚህ ፎልደር ውስጥ ተርሚናል ክፈት:
   npm install
   npm start
3. ብራውዘር ላይ http://localhost:3000 ክፈት (ሁለት ታብ ክፈት፤ እርስ በርስ ይገናኛሉ)

## ኢንተርኔት ላይ ለመልቀቅ (Render - ነጻ)
1. ፎልደሩን GitHub ላይ ጫን (አዲስ repository)
2. https://render.com → New → Web Service → repository ምረጥ
3. Build Command: npm install    Start Command: npm start
4. ሲጨርስ https://yourapp.onrender.com ሊንክ ይሰጥሃል (HTTPS አውቶማቲክ ነው፤ ለካሜራ ያስፈልጋል)

## ማስታወሻ
- ከተለያዩ ኔትወርኮች (ለምሳሌ ሞባይል ዳታ) ላይ ግንኙነት ካልተሳካ TURN ሰርቨር ያስፈልጋል (ለምሳሌ Metered.ca ነጻ እቅድ)።
  ከዚያ በ index.html ውስጥ ICE ዝርዝር ላይ TURN ጨምር።
- ይህ ፕሮቶታይፕ ነው፤ ለእውነተኛ ህዝብ ከመልቀቅህ በፊት የይዘት ቁጥጥር (moderation)፣ የዕድሜ ማረጋገጫ እና የአገርህ ሕግ ማየት አለብህ።
