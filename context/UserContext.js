import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

const userContext = createContext();

function UserContext(props) {
  const [user, setUser] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      return (await AsyncStorage.getItem("classnest_vendor"))
        ? setUser(JSON.parse(await AsyncStorage.getItem("classnest_vendor")))
        : setUser(null);
    };
    getUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser, 
        load, 
        setLoad
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}

export { UserContext, userContext };
