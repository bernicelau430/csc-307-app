import express from "express";

const app = express();
const port = 8000;
const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        },
        {
            "id": "qwe123",
            "job": "Zookeeper",
            "name": "Cindy"
        }
          
    ]
};

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};
  
app.post("/users", (req, res) => {
const userToAdd = req.body;
addUser(userToAdd);
res.send();
});

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
};

const deleteUserById = (id) => {
    const index = users["users_list"].findIndex((user) => user.id === id);
    if (index !== -1) {
        users["users_list"].splice(index, 1);
        return true;
    }
    return false;
};

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const deleted = deleteUserById(id);
    if (deleted) {
        res.send("User deleted successfully");
    } else {
        res.status(404).send("User not found");
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});
  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name !== undefined && job !== undefined) {
        let result = findUsersByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    } else if (name !== undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});
  

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});  

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});