import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons/MaterialCommunityIcons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View>

    </View>
    // <View style={[styles.container, { width }]}>
    //   {/* {icon && ( */}
    //   <MaterialCommunityIcons
    //     name={"Home"}
    //     size={20}
    //     color={defaultStyles.colors.medium}
    //     style={styles.icon}
    //   />
    //   {/* )} */}
    //   <TextInput
    //     placeholderTextColor={defaultStyles.colors.medium}
    //     style={defaultStyles.text}
    //     {...otherProps}
    //   />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;