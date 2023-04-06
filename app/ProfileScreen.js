import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
           source={require("./assets/no-user-image.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.name}>User Display Name</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Full Name:</Text>
        <Text style={styles.infoValue}>Fist Name Last Name</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>user@washcoll.edu</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <Text style={styles.infoValue}>No bio</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
});

export default ProfileScreen;