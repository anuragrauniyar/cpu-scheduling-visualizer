const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.post("/run", (req, res) => {
  const mode = req.body.mode || "trace";
  const algos = req.body.algos || "1";
  const last = req.body.last || "20";
  const count = req.body.count || "1";
  const procs = req.body.procs || "";

  const input = `${mode} ${algos} ${last} ${count}\n${procs}\n`;

  const cpuPath = path.join(__dirname, "../cpp/cpu.exe");
  const child = spawn(cpuPath);

  let output = "";
  let error = "";

  child.stdout.on("data", (d) => (output += d.toString()));
  child.stderr.on("data", (d) => (error += d.toString()));

  child.on("close", () => {
    if (error) return res.status(500).send(error);
    res.type("text/plain").send(output);
  });

  child.stdin.write(input);
  child.stdin.end();
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));

