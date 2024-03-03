import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getPost } from '../repository/postRepository'
import { Post } from '../types/post'
import Markdown from 'react-native-markdown-display'

const PostDetailsPage = () => {
  const { slug } = useLocalSearchParams()
  const [post, setPost] = useState(getPost(slug))

  if (!post) {
    return <Text>Post not found</Text>
  }

  return (
    <ScrollView
      contentContainerStyle={{
        maxWidth: 960,
        width: '100%',
        marginHorizontal: 'auto',
        padding: 20,
      }}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{post.title}</Text>
      <Markdown>{post.content}</Markdown>
    </ScrollView>
  )
}

export default PostDetailsPage