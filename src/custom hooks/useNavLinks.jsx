import UseAuth from "./UseAuth";

const useNavLinks = () => {
    const { user  , observerLoading} = UseAuth();

    if(observerLoading) return [];

    const links = [
        { path: "/", label: "Home" },
        { path: "/classes", label: "Classes" },
        { path: "/trainers", label: "Trainers" },
    ];

    if (user) {
        links.push({ path: "/community", label: "Community" });
        links.push({ path: "/be-a-trainer", label: "Be a Trainer" });
        links.push({ path: "/dashboard", label: "Dashboard" });
    }

    return links;
};

export default useNavLinks;

