import UseAuth from "./UseAuth";

const useNavLinks = () => {
    const { user  , observerLoading} = UseAuth();

    if(observerLoading) return [];

    const links = [
        { path: "/", label: "Home" },
        { path: "/trainers", label: "Trainers" },
        { path: "/classes", label: "Classes" },
        { path: "/community", label: "Community" },
        { path: "/be-a-trainer", label: "Be a Trainer" },

    ];

    if (user) {
        links.push({ path: "/dashboard", label: "Dashboard" });
    }

    return links;
};

export default useNavLinks;

