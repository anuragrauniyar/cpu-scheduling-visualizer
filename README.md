# CPU Scheduling Visualizer

An interactive web-based tool to simulate and visualize classical CPU scheduling algorithms using a high-performance C++ backend with a Node.js server and a simple web UI. This project helps in understanding how different scheduling strategies behave over time and how they affect turnaround and waiting times of processes.

---

## 🚀 Features

- Supports multiple CPU scheduling algorithms:
  - FCFS (First Come First Serve)
  - Round Robin (with configurable quantum)
  - SPN (Shortest Process Next)
  - SRT (Shortest Remaining Time)
  - HRRN (Highest Response Ratio Next)
  - Feedback Queues (FB-1, FB-2i)
  - Aging
- Two modes:
  - Trace – Visual timeline of CPU execution
  - Stats – Tabular statistics (Finish time, Turnaround time, Normalized turnaround)
- C++ simulator for performance and correctness
- Node.js backend to execute the simulator
- Web UI for interactive input and output visualization

---

## 🧠 Tech Stack

- C++ – Core CPU scheduling simulator  
- Node.js + Express – Backend API  
- HTML, CSS, JavaScript – Frontend UI  
- Git – Version control  

---

## 📂 Project Structure

cpu-scheduling-visualizer/
|
|-- cpp/              # C++ scheduling algorithms (compiled binary here)
|-- server/           # Node.js + Express backend
|-- public/           # Frontend UI (index.html)
|-- .gitignore
|-- README.md

---

## 🛠️ Setup & Run Locally

1) Compile the C++ simulator

cd cpp  
g++ *.cpp -o cpu  

On Windows, this will generate cpu.exe.

2) Install backend dependencies

cd server  
npm install  

3) Run the server

node server.js  

4) Open in browser

http://localhost:3000

---

## ✍️ Sample Input Format

trace 1,2-2,4 20 5  
A,0,3  
B,2,6  
C,4,4  
D,6,5  
E,8,2  

- trace or stats – Output mode  
- 1,2-2,4 – Algorithms to run (e.g., FCFS, RR with quantum 2, SRT)  
- 20 – Total simulation time  
- 5 – Number of processes  

---

## 🎯 Learning Objectives

- Understand CPU scheduling algorithms and their trade-offs  
- Practice systems programming in C++  
- Integrate native binaries with a Node.js backend  
- Build a simple interactive web UI for algorithm visualization  

---
