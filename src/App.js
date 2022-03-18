import { useEffect, useState } from "react";
import { authentication } from "./firebase-confiq";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import shuffle from "shuffle-array";

import "./App.css";
import characters from "./bingoNumbers";

import { Bingo } from "./components/Bingo";
import { UserWelcome } from "./components/UserWelcome";

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const [winnerRow, setwinnerRow] = useState([]);

  const signInWithGoogle = () => {
    signInWithPopup(authentication, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const winnerRow = shuffle(characters).slice(0, 5);
    setwinnerRow(winnerRow);
    console.log("winnerRow", winnerRow);
  };

  const logout = () => {
    setUser({});
  };

  return (
    <div>
      {!user.accessToken && (
        <div className="App-container">
          <h2 className="welcome">Welcome</h2>
          <button className="login-button" onClick={signInWithGoogle}>
            Login with Google
          </button>
        </div>
      )}
      {user.accessToken && (
        <div>
          <UserWelcome
            logout={logout}
            photo={user.photoURL}
            userName={user.displayName}
          />
          <Bingo winnerRow={winnerRow} user={user} />
        </div>
      )}
    </div>
  );
}

export default App;
