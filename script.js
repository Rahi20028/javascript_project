document.getElementById("search-btn").addEventListener("click", () => {
    const input = document.getElementById("username-input").value.trim()

    if (input === "") {
        alert("please enter a username")
    }

    loadProfile(input)
})

async function loadProfile(username) {
    const url = `https://api.github.com/users/${username}`
    try {
        const response = await fetch(url)
        const data = await response.json()



        document.getElementById("followers-list").innerHTML = "";
        document.getElementById("following-list").innerHTML = "";
        document.getElementById("repos-list").innerHTML = "";
        document.getElementById("repos-section").style.display = "none";



        document.getElementById("full-name").textContent = data.name
        document.getElementById("avatar").src = data.avatar_url
        document.getElementById("username").textContent = `@${data.login}`
        document.getElementById("created-at").textContent = new Date(data.created_at).toLocaleDateString()


        await Followers(data.followers_url)
        await Following(data.following_url.replace("{/other_user}", ""))
        Repo(data.repos_url)
    }
    catch (error) {
        console.log("error fetching user profile : ", error);

    }
}

async function Followers(url) {
    try {
        const response = await fetch(url);
        const followers = await response.json();

        document.getElementById("followers-count").textContent = followers.length;
        const list = document.getElementById("followers-list");

        followers.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.login;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching followers:", error);
    }
}

async function Following(url) {
    try {
        const response = await fetch(url)
        const following = await response.json()

        document.getElementById("following-count").textContent = following.length
        const list = document.getElementById("following-list")

        following.forEach(user => {
            const li = document.createElement("li")
            li.textContent = user.login
            list.appendChild(li)
        })
    }
    catch (error) {
        console.log("error fetching followings :", error);

    }
}

async function Repo(url) {
    const button = document.getElementById("show-repos-btn")

    button.addEventListener("click", async () => {
        try {
            const response = await fetch(url)
            const repo = await response.json()

            document.getElementById("repos-section").style.display = "block"
            const list = document.getElementById("repos-list")

            repo.forEach(repositor => {
                const a = document.createElement("a")
                const li = document.createElement("li")
                a.href = repositor.html_url;
                a.textContent = repositor.name;


                li.appendChild(a)
                list.appendChild(li)
            })


        } catch (error) {
            console.log("error fetching repo :", error);

        }
    })
}
