import PostApi from '../api/postApi';
export interface Post {
  id: string;
  userId: string;
  message: string;
  username: string;
  image?: string;
  userImage?: string;
}

const addPost = async (post: Post) => {
  console.log('addPost');
  try {
    const res: any = PostApi.addPost(post);
    console.log(res.data);
  } catch (err) {
    console.log('add post fail: ' + err);
  }
};

const getAllPosts = async () => {
  console.log('getall posts()');1
  const res: any = await PostApi.getAllPosts();
  console.log({ res });
  let data = Array<Post>();
  if (res.data) {
    res.data.forEach((obj: any) => {
      // console.log("element: " + obj._id)
      const st: Post = {
        userId: obj.sender,
        id: obj._id,
        message: obj.message,
        image: obj?.image || '',
        userImage: obj?.userImage || '',
        username: obj?.username || '',
      };
      data.push(st);
    });
  }
  console.log({ data });

  return data;
};

export default { getAllPosts, addPost };
