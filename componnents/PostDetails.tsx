import { FC, useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import { Post } from '../model/PostModel';

const PostDetails: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const post: Post = route.params.post;

  // useEffect(() => {
  //     navigation.setOptions({ title: 'new Title' + id });
  // })

  return (
    <View
      style={{
        flex: 1,
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 40,
      }}
    >
      <Text style={styles.title}>Post Screen</Text>
      <Text style={styles.info}>id:{post?.id}</Text>
      <Text style={styles.info}> Message:{post?.message}</Text>
      {post?.userImage && <Text>user Image</Text>}
      {post?.userImage && (
        <Image
          style={styles.image}
          source={{ uri: post.userImage.toString() }}
        />
      )}
      {post?.image && <Text>Post Image:</Text>}
      {post?.image && (
        <Image style={styles.image} source={{ uri: post.image.toString() }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  info: {
    fontSize: 17,
    marginBottom: 12,
  },
  image: {
    margin: 10,
    resizeMode: 'contain',
    height: 130,
    width: 130,
  },
});
export default PostDetails;
