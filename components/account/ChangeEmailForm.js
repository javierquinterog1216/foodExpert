import { isEmpty } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import {
  reauthenticate,
  updateEmail
} from "../../utils/actions";
import { validateEmail } from "../../utils/helpers";

export default function ChangeEmailForm({
  email,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newEmail, setNewEmail] = useState(email);
  const [password, setPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const resultReaAuthenticate = await reauthenticate(password);
    if (!resultReaAuthenticate.statusResponse) {
      setLoading(false);
      setErrorPassword("Constraseña Incorrecta");
      return;
    }
    const resultUpdateEmail = await updateEmail(newEmail);
    setLoading(false);
    if (!resultUpdateEmail.statusResponse) {
      setErrorEmail(
        "No se puede cambiar por este correo, ya está en uso por otro usuario"
      );
      return;
    }
    setReloadUser(true);
    toastRef.current.show("se ha actualizado el email", 3000);
    setShowModal(false);
  };
  const validateForm = () => {
    setErrorEmail(null);
    setErrorPassword(null);
    let isValid = true;
    if (!validateEmail(newEmail)) {
      setErrorEmail("Debes Ingresar un email válido");

      isValid = false;
    }
    if (newEmail === email) {
      setErrorEmail("Debes Ingresar email diferente al actual");

      isValid = false;
    }
    if (isEmpty(password)) {
      setErrorPassword("Debes Ingresar tu constraseña");

      isValid = false;
    }
    return isValid;
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Ingresa el nuevo correo"
        containerStyle={styles.input}
        defaultValue={email}
        keyboardType="email-address"
        onChange={(e) => {
          setNewEmail(e.nativeEvent.text);
        }}
        errorMessage={errorEmail}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
      />
      <Input
        placeholder="Ingresa tu constraseña"
        containerStyle={styles.input}
        defaultValue={password}
        onChange={(e) => {
          setPassword(e.nativeEvent.text);
        }}
        errorMessage={errorPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline " : "eye-outline"}
            iconStyle={{ color: "#c2c2c2" }}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        password={true}
        secureTextEntry={!showPassword}
      />
      <Button
        title="Cambiar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    width: "95%",
  },
  btn: {
    backgroundColor: "#442484",
  },
});
