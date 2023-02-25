import { FC } from "react";
import { View ,Text} from "react-native";

export const ChatScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Info Screen</Text>
      </View>
    );
  }
  
  