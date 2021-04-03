import { isEmpty } from "lodash";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { reauthenticate, updateEmail, updatePassword } from "../../utils/actions";
import { validateEmail } from "../../utils/helpers";

export default function ChangePasswordForm({ setShowModal, toastRef }) {
  const [newPassword, setNewPassword] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorNewPassword, setErrorNewPassword] = useState(null);
  const [errorCurrentPassword, setErrorCurrentPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const resultReaAuthenticate = await reauthenticate(currentPassword);
    if (!resultReaAuthenticate.statusResponse) {
      setLoading(false);
      setErrorCurrentPassword("Constraseña Incorrecta");
      return;
    }
    const resultUpdatePassword = await updatePassword(newPassword);
    setLoading(false);
    if (!resultUpdatePassword.statusResponse) {
      setErrorNewPassword(
        "Ocurrió un error cambiando la contraseña, intente más tarde"
      );
      setErrorConfirmPassword(
        "Ocurrió un error cambiando la contraseña, intente más tarde"
      );
      return;
    }
    
    toastRef.current.show("se ha actualizado la contraseña", 3000);
    setShowModal(false);
  };
  const validateForm = () => {
    setErrorNewPassword(null);
    setErrorCurrentPassword(null)
    setErrorConfirmPassword(null);
    let isValid = true;

    if (isEmpty(currentPassword)) {
        setErrorCurrentPassword("Debes Ingresar tu contraseña actual");

      isValid = false;
    }
    if (size(newPassword) < 6) {
      setErrorNewPassword("Debes Ingresar una nueva constraseña de al menos 6 carácteres");

      isValid = false;
    }
    if (size(confirmPassword) < 6) {
        setErrorNewPassword("Debes Ingresar una confirmación de tu constraseña de al menos 6 carácteres");
  
        isValid = false;
      }
    if (newPassword !== confirmPassword) {
      setErrorConfirmPassword("la nueva contraseña y la confirmación no con iguales");
      setErrorNewPassword("la nueva contraseña y la confirmación no con iguales");
      isValid = false;
    }
    if (newPassword == currentPassword) {
        setCurrentPassword("debes ingresar una contraseña diferente a la actual");
        setErrorConfirmPassword("debes ingresar una contraseña diferente a la actual");
        setErrorNewPassword("debes ingresar una contraseña diferente a la actual");
        isValid = false;
      }
    return isValid;
  };

  return (
    <View style={styles.view}>
      
      <Input
        placeholder="Ingresa tu contraseña Actual"
        containerStyle={styles.input}
        defaultValue={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.nativeEvent.text);
        }}
        errorMessage={errorCurrentPassword}
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
      <Input
        placeholder="Ingresa tu nueva contraseña Actual"
        containerStyle={styles.input}
        defaultValue={newPassword}
        onChange={(e) => {
          setNewPassword(e.nativeEvent.text);
        }}
        errorMessage={errorNewPassword}
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
      <Input
        placeholder="Ingresa la confirmación de tu contraseña"
        containerStyle={styles.input}
        defaultValue={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.nativeEvent.text);
        }}
        errorMessage={errorConfirmPassword}
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
        title="Cambiar Contraseña"
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
