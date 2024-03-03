import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { getPost } from '../repository/postRepository'
import { Post } from '../types/post'

const PostDetailsPage = () => {
  const { slug } = useLocalSearchParams()
  const [post, setPost] = useState(getPost(slug))

  if (!post) {
    return <Text>Post not found</Text>
  }

  return (
    <View>
      <Stack.Screen options={{ title: 'Post Details' }} />
      <Text>Post Title: {post.title}</Text>
    </View>
  )
}

export default PostDetailsPage