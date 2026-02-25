import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_USERS = gql`
    query GetUsersList {
        getUsers {
            id
            name
        }
    }
`;

const ADD_USER = gql`
    mutation AddUser {
        createUser {
            id
            name
        }
    }
`;

const UPDATE_USER = gql`
    mutation UpdateUser {
        updateUser {
            id
            name
        }
    }
`;

const DELETE_USER = gql`
    mutation DeleteUser {
        deleteUser {
            id
        }
    }
`;

function App() {
    const { loading, error, data } = useQuery(GET_USERS);

    const [addUser] = useMutation(ADD_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });
    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });
    const [deleteUser] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    if (loading) return <p>Chargement des utilisateurs...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    const users = data?.getUsers || [];

    const handleRandomInsert = () => {
        addUser().catch((err) => console.error("Erreur d'insertion:", err));
    };

    const handleRandomUpdate = () => {
        updateUser().catch((err) =>
            console.error("Erreur de modification:", err),
        );
    };

    const handleRandomDelete = () => {
        deleteUser().catch((err) =>
            console.error("Erreur de suppression:", err),
        );
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "20px",
                fontFamily: "sans-serif",
            }}
        >
            {/* --- COLONNE GAUCHE : La liste --- */}
            <div
                style={{
                    width: "45%",
                    backgroundColor: "#f9f9f9",
                    padding: "20px",
                    borderRadius: "8px",
                }}
            >
                <h2>Liste des utilisateurs ({users.length})</h2>
                {users.length === 0 ? (
                    <p>Aucun utilisateur en base.</p>
                ) : (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} style={{ marginBottom: "10px" }}>
                                <strong>{user.name}</strong>{" "}
                                <em>(ID: {user.id})</em>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* --- COLONNE DROITE : Les boutons CRUD --- */}
            <div
                style={{
                    width: "45%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <h2>Actions CRUD Aléatoires</h2>

                <button
                    onClick={handleRandomInsert}
                    style={{
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "4px",
                    }}
                >
                    ➕ Insert Aléatoire
                </button>

                <button
                    onClick={handleRandomUpdate}
                    style={{
                        padding: "10px",
                        backgroundColor: "#FF9800",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "4px",
                    }}
                >
                    ✏️ Update Aléatoire
                </button>

                <button
                    onClick={handleRandomDelete}
                    style={{
                        padding: "10px",
                        backgroundColor: "#F44336",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "4px",
                    }}
                >
                    🗑️ Delete Aléatoire
                </button>
            </div>
        </div>
    );
}

export default App;
