import http from "http";
import ws from "websocket";

const createServer = port => {
  const httpServer = http.createServer();
  console.log("Started server. Port", port);
  httpServer.listen(port);
  const wss = new ws.server({
    httpServer,
    autoAcceptConnections: false
  });
  return wss;
};

const getDate = () => new Date().toLocaleString();

const originIsAllowed = origin => {
  console.log("TODO: Sec issue. Check origin allowed", origin);
  return true;
};

export default function server(port, onClient) {
  const wss = createServer(port);
  wss.on("request", req => {
    if (!originIsAllowed(req.origin)) {
      req.reject();
      console.log(getDate() + " Rejected from origin " + req.origin);
      return;
    }
    const conn = req.accept("echo-protocol", req.origin);
    console.log(getDate() + " Connection accepted.", conn.remoteAddress);

    const client = {
      send: msg => conn.sendUTF(JSON.stringify(msg)),
      remoteAddress: conn.remoteAddress
    };

    conn.on("message", message => {
      if (message.type !== "utf8") {
        console.error("Got non-utf8 type message");
        return;
      }
      let msg = null;
      try {
        msg = JSON.parse(message.utf8Data);
      } catch (e) {}
      if (client.onMessage) client.onMessage(msg);
    });

    conn.on("close", (reasonCode, message) => {
      if (client.onClose) client.onClose(reasonCode, message);
    });

    onClient(client);
  });
}
