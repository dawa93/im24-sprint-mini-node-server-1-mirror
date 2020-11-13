const { write } = require("fs");
const http = require("http");

const PORT = 5000;

const ip = "localhost";

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (method === "OPTIONS") {
    res.writeHead(200, defaultCorsHeader);
  }
  if (method === "POST") {
    res.writeHead(200, defaultCorsHeader);
    let data = [];
    if (url === "/upper") {
      req
        .on("data", (chunk) => data.push(chunk))
        .on("end", () => {
          data = Buffer.concat(data).toString();
          res.end(data.toUpperCase());
          return;
        });
    } else if (url === "/lower") {
      req
        .on("data", (chunk) => data.push(data))
        .on("end", () => {
          data = Buffer.concat(data).toString();
          res.end(data.toLowerCase());
          return;
        });
    }
  } else {
    res.statusCode = 404;
    res.end();
  }

  console.log(`http request method is ${req.method}, url is ${req.url}`);
});

server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": 10,
};

// if (request.method === "OPTIONS") {
//   response.writeHead(200, defaultCorsHeader);
// }
// // 만약에 메소드가 post이고, /upper면 대문자를 보내주고
// if (request.method === "POST" && request.url === "/upper") {
//   let body = [];
//   response.writeHead(200, defaultCorsHeader);
//   request
//     .on("data", (chunk) => {
//       body.push(chunk);
//     })
//     .on("end", () => {
//       body = Buffer.concat(body).toString();
//       console.log(body);
//       response.end(body.toUpperCase());
//     });
//   // 만약에 메소드가 post이고, /lower면 소문자를 보내준다.
// } else if (request.method === "POST" && request.url === "/lower") {
//   let body = [];
//   response.writeHead(200, defaultCorsHeader);
//   request
//     .on("data", (chunk) => {
//       body.push(chunk);
//     })
//     .on("end", () => {
//       body = Buffer.concat(body).toString();
//       console.log(body);
//       response.end(body.toLowerCase());
//     });
// } else {
//   response.statusCode = 404;
//   response.end();
// }
