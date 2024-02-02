import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});  
  
app.get("/users", (req, res) => {
    const name = req.query["name"];
    const job = req.query["job"];
    userServices.getUsers(name, job)
        .then(result => res.send({ users_list: result }))
        .catch(error => {
            console.log(error);
            res.status(500).send("An error occurred in the server.");
        });
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    userServices.findUserById(id)
        .then(result => {
            if (!result) {
                res.status(404).send("Resource not found.");
            } else {
                res.send({ users_list: [result] });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("An error occurred in the server.");
        });
});

app.post("/users", (req, res) => {
    const user = req.body;
    userServices.addUser(user)
        .then(savedUser => res.status(201).send(savedUser))
        .catch(error => {
            console.log(error);
            res.status(500).send("An error occurred in the server.");
        });
});

app.get("/users", (req, res) => {
    const name = req.query["name"];
    const job = req.query["job"];
    userServices.findUsersByNameAndJob(name, job)
        .then(result => res.send({ users_list: result }))
        .catch(error => {
            console.log(error);
            res.status(500).send("An error occurred in the server.");
        });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    userServices.deleteUserById(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).send("User deleted successfully");
            } else {
                res.status(404).send("User not found");
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("An error occurred in the server.");
        });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});