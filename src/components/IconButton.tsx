import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface IconButtonProps {
  text: string;
  Icon: any;
  name: string;
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, name, text }) => {
  return (
    <View style={styles.iconButton}>
      <Icon style={styles.icon} name={name} size={18} color="grey" />
      <Text style={styles.iconButtonText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButtonText: {
    color: "grey",
    marginLeft: 5,
  },
  icon: {
    marginRight: 10,
  },
});

export default IconButton;
