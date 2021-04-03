import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { closeSession, getCurrentUser } from "../../utils/actions";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import InfoUser from "../../components/account/InfoUser";
import AccountOptions from "../../components/account/AccountOptions";

export default function UserLogged() {
  const toastRef = useRef();
  const navigation = useNavigation();
  const [loadig, setLoadig] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(null);
  const [reloadUser, setReloadUser] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser());
    setReloadUser(false)
  }, [reloadUser]);
  return (
    <View style={styles.container}>
      {
          user && 
          (
            <View>
                <InfoUser 
                 user={user} 
                 setLoadig={setLoadig} 
                 setLoadingText={setLoadingText}/>
                <AccountOptions
                user={user} 
                toastRef={toastRef}
                setReloadUser={setReloadUser}
                />
            </View>
          
          )
      }
      
      <Button
        title="Cerrar Sesión"
        onPress={() => {
          closeSession();
          navigation.navigate("restaurants");
        }}
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionTitle}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loadig} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#442484",
    borderBottomWidth: 1,
    borderBottomColor: "#442484",
    paddingVertical: 10,
  },
  btnCloseSessionTitle: {
    color: "#442484",
  },
});
