import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    // --- HTTP Requests --- //

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    
        return promise;
    }

    // --- Hooks --- //

    function updateList(person) { 
        postUser(person)
            .then((res) => {
                if (res.status === 201) {
                    return res.json();
                } else {
                    throw new Error(`Failed to add user. Status code: ${res.status}`);
                }
            })
            .then((json) => {
                setCharacters([...characters, json]);
            })
            .catch((error) => {
                console.log(error);
        });
    }

    function removeOneCharacter(index) {
        fetch(`http://localhost:8000/users/${characters[index]._id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (res.status === 204) {
                const updated = characters.filter((character, i) => i !== index);
                setCharacters(updated);
            } else if (res.status === 404) {
                throw new Error("User not found on the server.");
            } else {
                throw new Error(`Failed to delete user. Status code: ${res.status}`);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;