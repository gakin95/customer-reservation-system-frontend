class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    const userObj = {
      accessToken: user?.accessToken,
      email: user?.Email,
      firstName: user?.FirstName,
      lastName: user?.LastName,
      phone: user?.PhoneNumber,
      userId: user?.UserID,
      userType: user?.UserType,
      username: user?.Username
    };
    localStorage.setItem("user", JSON.stringify(userObj));
  }

  removeUser() {
    // localStorage.removeItem("user");
    localStorage.clear();
  }
}

export default new TokenService();
