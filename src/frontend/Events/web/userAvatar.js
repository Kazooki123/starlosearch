function getProfilePicture(user) {
    if (user.profilePictures) {
        return user.profilePictures;
    } else {
        const defaultAvatars = ["avatar1.jpg", "avatar2.jpg", "avatar3.jpg"];
        
        const randomAvatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
        return randomAvatar;
    }
}

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    const user = getUserByUsername(username);

    const profilePicture = getProfilePicture(user);

    res.render('profile', { user, profilePicture });
});