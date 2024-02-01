import express from "express";
import cors from "cors";

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

// --- Controllers --- //

const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2, 8);
    return randomId;
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);


const addUser = (user) => {
    const randomId = generateRandomId();
    user.id = randomId;
    
    users["users_list"].push(user);
    return user;
};

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


// --- Routes --- //

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});  
  
app.get("/users", async (req, res) => {
    const name = req.query["name"];
    const job = req.query["job"];
    try {
      const result = await userServices.getUsers(name, job);
      res.send({ users_list: result });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    }
});

app.get("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else {
      res.send({ users_list: result });
    }
});

app.post("/users", async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser) {
        res.status(201).send(savedUser);
    } else {
        res.status(500).end();
    }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const deleted = deleteUserById(id);
    if (deleted) {
        res.status(204).send("User deleted successfully");
    } else {
        res.status(404).send("User not found");
    }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});