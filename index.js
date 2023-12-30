// import http
const http = require("http");
const fs = require("fs").promises;
const host = "localhost";
const port = 8080;
/*

const requestListenerCallback = () => {
    // if request.url === index.html
    // read index.html file using fs
    // return file

    // etc.
}*/
const handleError = (res, err) => {
  res.writeHead(500);
  res.end(err);
};

const handleContentRequest = (res, contents) => {
  res.setHeader("Content-type", "text/html");
  res.writeHead(200);
  res.end(contents);
};

const requestListener = (req, res) => {
  if (req.url === "/index.html") {
    fs.readFile(__dirname + "/index.html")
      .then((contents) => handleContentRequest(res, contents))
      .catch((err) => handleError(res, err));
    return;
  } else if (req.url === "/about.html") {
    fs.readFile(__dirname + "/about.html")
      .then((contents) => handleContentRequest(res, contents))
      .catch((err) => handleError(res, err));
    return;
  } else if (req.url === "/contact-me.html") {
    fs.readFile(__dirname + "/contact-me.html")
      .then((contents) => handleContentRequest(res, contents))
      .catch((err) => handleError(res, err));
    return;
  }

  fs.readFile(__dirname + "/404.html")
    .then((contents) => {
      res.setHeader("Content-type", "text/html");
      res.writeHead(404);
      res.end(contents);
    })
    .catch((err) => {
      res.writeHead(500);
      res.end(err);
      return;
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

/*// Listen for requests
server.listen(8080);*/
