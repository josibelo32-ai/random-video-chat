// Random 1-to-1 video chat: signaling server (WebSocket) + static files
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
app.set('trust proxy', true);
app.use(express.static('public'));
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let waiting = null;                 // one person waiting for a partner
const reports = new Map();          // ip -> number of reports against it
const BAN_AFTER = 3;

const send = (ws, obj) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj)); };
const ipOf = (req) => (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();

function leave(ws) {
  if (waiting === ws) waiting = null;
  if (ws.partner) {
    send(ws.partner, { type: 'partner-left' });
    ws.partner.partner = null;
    ws.partner = null;
  }
}

function join(ws) {
  leave(ws);
  if (waiting && waiting !== ws && waiting.readyState === 1) {
    const other = waiting; waiting = null;
    ws.partner = other; other.partner = ws;
    send(other, { type: 'matched', initiator: true });   // other creates the offer
    send(ws, { type: 'matched', initiator: false });
  } else {
    waiting = ws;
    send(ws, { type: 'waiting' });
  }
}

wss.on('connection', (ws, req) => {
  ws.ip = ipOf(req);
  if ((reports.get(ws.ip) || 0) >= BAN_AFTER) {
    send(ws, { type: 'banned' }); return ws.close();
  }
  ws.on('message', (raw) => {
    let m; try { m = JSON.parse(raw); } catch { return; }
    if (m.type === 'join') return join(ws);
    if (m.type === 'leave') return leave(ws);
    if (m.type === 'signal' && ws.partner) return send(ws.partner, { type: 'signal', data: m.data });
    if (m.type === 'report' && ws.partner) {
      const ip = ws.partner.ip;
      reports.set(ip, (reports.get(ip) || 0) + 1);
      console.log('REPORT against', ip, 'total', reports.get(ip));
      return join(ws);                 // move reporter to a new partner
    }
  });
  ws.on('close', () => leave(ws));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Running on port ' + PORT));
