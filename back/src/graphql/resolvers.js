import { supabase } from "../database/supabase.js";

const resolvers = {
    Query: {
        getUsers: async () => {
            const { data, error } = await supabase
                .from("graphql-users")
                .select("*");

            if (error) {
                console.error("Erreur Supabase (getUsers):", error);
                throw new Error("Impossible de récupérer les utilisateurs");
            }

            return data;
        },
    },

    Mutation: {
        createUser: async () => {
            const randomSuffix = Math.floor(Math.random() * 10000);

            const { data, error } = await supabase
                .from("graphql-users")
                .insert({
                    name: `Utilisateur_${randomSuffix}`,
                    email: `user${randomSuffix}@exemple.com`,
                    password: `pass_${randomSuffix}`,
                })
                .select();

            if (error) {
                console.error("Erreur Supabase (createUser):", error);
                throw new Error("Impossible de créer l'utilisateur");
            }

            return data[0];
        },

        updateUser: async () => {
            const { data: users, error: fetchError } = await supabase
                .from("graphql-users")
                .select("id");

            if (fetchError || !users || users.length === 0) {
                throw new Error("Aucun utilisateur à modifier");
            }

            const randomUser = users[Math.floor(Math.random() * users.length)];
            const newName = `Modifié_${Math.floor(Math.random() * 1000)}`;

            const { data, error: updateError } = await supabase
                .from("graphql-users")
                .update({ name: newName })
                .eq("id", randomUser.id)
                .select();

            if (updateError) {
                console.error("Erreur Supabase (updateUser):", updateError);
                throw new Error("Impossible de modifier l'utilisateur");
            }

            return data[0];
        },

        deleteUser: async () => {
            const { data: users, error: fetchError } = await supabase
                .from("graphql-users")
                .select("*");

            if (fetchError || !users || users.length === 0) {
                throw new Error("Aucun utilisateur à supprimer");
            }

            const randomUser = users[Math.floor(Math.random() * users.length)];

            const { data, error: deleteError } = await supabase
                .from("graphql-users")
                .delete()
                .eq("id", randomUser.id);

            if (deleteError) {
                console.error("Erreur Supabase (deleteUser):", deleteError);
                throw new Error("Impossible de supprimer l'utilisateur");
            }

            return randomUser;
        },
    },
};

export default resolvers;
