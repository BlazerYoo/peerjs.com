const ejs = require("ejs");
const fs = require("fs");

const PEERJS_VERSION = "1.5.0";

function render(file, data) {
  ejs.renderFile("./views/" + file + ".ejs", data, {}, (err, str) => {
    ejs.renderFile(
      "./views/layout.ejs",
      { ...data, body: str },
      {},
      (err, str) => {
        fs.writeFile("out/" + file + ".html", str, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //file written successfully
        });
      },
    );
  });
}

render("index", {
  page: "home",
  version: PEERJS_VERSION,
  title: "PeerJS - Simple peer-to-peer with WebRTC",
});
render("examples", { page: "examples", title: "PeerJS - Examples" });
render("peerserver", {
  gratitude: false,
  page: "peerserver",
  title: "PeerJS - Sign up for PeerServer Cloud",
});
render("team", { page: "team", title: "PeerJS - Team" });
render("404", {});
ejs.renderFile(
  "./public/docs/index.ejs",
  { version: PEERJS_VERSION },
  {},
  (err, str) => {
    fs.writeFile(`out/docs/index.html`, str, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    });
  },
);
