import RNBounceable from "@freakycoder/react-native-bounceable";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const labels: { [key: string]: string } = {
    webDev: "Développement Web",
    mobileDev: "Développement Mobile",
    ai: "Intelligence Artificielle",
    design: "UI/UX Design",
    backend: "Backend",
    devops: "DevOps",
    dataScience: "Data Science",
    cybersecurity: "Cybersécurité",
    blockchain: "Blockchain",
    gaming: "Gaming",
    cloud: "Cloud Computing",
    iot: "Internet des Objets",
  };

  const icons: { [key: string]: string } = {
    webDev: "🌐",
    mobileDev: "📱",
    ai: "🤖",
    design: "🎨",
    backend: "⚙️",
    devops: "🔄",
    dataScience: "📊",
    cybersecurity: "🔒",
    blockchain: "⛓️",
    gaming: "🎮",
    cloud: "☁️",
    iot: "🔌",
  };

  const preferences = Object.entries(labels).map(([label, value]) => ({
    icon: icons[label],
    label,
    value,
  }));

  const [interests, setInterests] = React.useState(
    Object.keys(labels).reduce(
      (acc, key) => ({
        ...acc,
        [key]: false,
      }),
      {}
    )
  );

  const toggleInterest = (interest: string) => {
    setInterests((prev) => {
      const currentValue = prev[interest as keyof typeof interests];
      return {
        ...prev,
        [interest]: currentValue ? false : true,
      };
    });
  };

  const handleSubmit = () => {
    const selectedInterests = Object.entries(interests)
      .filter(([_, value]) => value)
      .map(([key, _]) => {
        return labels[key];
      });

    if (selectedInterests.length === 0) {
      Alert.alert(
        "Attention",
        "Veuillez sélectionner au moins un centre d'intérêt"
      );
    } else {
      Alert.alert(
        "Centres d'intérêt sélectionnés",
        selectedInterests.join("\n"),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Centres d'intérêt</Text>
      <View style={styles.buttonContainer}>
        {preferences.map(({ icon, label, value }) => (
          <RNBounceable key={label} onPress={() => toggleInterest(label)}>
            <View
              style={[
                styles.interestButton,
                interests[label as keyof typeof interests] &&
                  styles.activeButton,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  interests[label as keyof typeof interests] &&
                    styles.activeButtonText,
                ]}
              >
                {icon} {value}
              </Text>
            </View>
          </RNBounceable>
        ))}
      </View>

      <View style={styles.submitContainer}>
        <RNBounceable onPress={handleSubmit}>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Valider mes choix</Text>
          </View>
        </RNBounceable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 30,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 10,
  },
  interestButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 150,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: "#6C63FF",
  },
  buttonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  activeButtonText: {
    color: "white",
  },
  submitContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  submitButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default App;
