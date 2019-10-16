/**
 * BASIC SETUP
 */

// requiring express
const express = require("express");
// using express as a function
const server = express();
// making our server function work with json
server.use(express.json());

/**
 * MIDDLEWARES
 */

// checking if a project exists
function checkIfProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);
  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

// counting the number of requisitions
let requestsCounter = 0;

function checkRequisitions(req, res, next) {
  requestsCounter++;
  console.log(`Number of requisitions: ${requestsCounter}`);
  return next();
}

server.use(checkRequisitions);

/**
 * CRUD operations
 */

// the array of projects to work with
const projects = [];

// CREATING a project
server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;
  const newProject = {
    id,
    title,
    tasks: []
  };
  projects.push(newProject);
  return res.json(projects);
});
// READING all projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});
// UPDATING a project
server.put("/projects/:id", checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const updatedProject = projects.find(project => project.id == id);
  updatedProject.title = title;
  return res.json(projects);
});
// DELETING a project
server.delete("/projects/:id", checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(project => project.id == id);
  projects.splice(projectIndex, 1);
  return res.json(projects);
});
// CREATING a task in a project
server.post("/projects/:id/tasks", checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(project => project.id == id);
  project.tasks.push(title);
  return res.json(projects);
});

/**
 * PORT
 */

server.listen(3030);
