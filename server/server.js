const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

// 1. Define paths relative to this file (__dirname is /app/server)
const cpuPathWin = path.join(__dirname, "../cpp/cpu.exe");
const cpuPathLinux = path.join(__dirname, "../cpp-src/cpu");

// 2. Determine the correct binary ONCE at startup
// The Docker container will find cpuPathLinux. Local Windows dev will find cpuPathWin.
const binaryPath = fs.existsSync(cpuPathLinux) ? cpuPathLinux : cpuPathWin;

console.log("Using CPU binary at:", binaryPath);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.post("/run", (req, res) => {
  const mode = req.body.mode || "trace";
  const algos = req.body.algos || "1";
  const last = req.body.last || "20";
  const count = req.body.count || "1";
  const procs = req.body.procs || "";

  // Prepare input string for the C++ program
  const input = `${mode} ${algos} ${last} ${count}\n${procs}\n`;

  // 3. USE THE GLOBAL binaryPath variable here.
  // DO NOT re-declare 'const cpuPath = ...' pointing to cpu.exe
  const child = spawn(binaryPath);

  let output = "";
  let error = "";

  // Listen for data from the C++ program
  child.stdout.on("data", (d) => (output += d.toString()));
  child.stderr.on("data", (d) => (error += d.toString()));

  child.on("error", (err) => {
    console.error("Failed to start child process:", err);
    res.status(500).send("Server Error: Could not start simulation binary.");
  });

  child.on("close", (code) => {
    if (code !== 0) {
        console.error(`Process exited with code ${code}`);
        // If there was stderr output, send that. Otherwise send a generic error.
        return res.status(500).send(error || `Simulation process exited with code ${code}`);
    }
    res.type("text/plain").send(output);
  });

  // Write input to the C++ program
  child.stdin.write(input);
  child.stdin.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));