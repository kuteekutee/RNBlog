import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getAllPosts, getPost } from '../repository/postRepository'
import { Post } from '../types/post'
import Markdown from 'react-native-markdown-display'
import Head from 'expo-router/head'

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  const posts = getAllPosts()

  return posts.map(post => ({ slug: post.slug }));
}

const PostDetailsPage = () => {
  const { slug } = useLocalSearchParams()
  const [post, setPost] = useState(getPost(slug))

  if (!post) {
    return <Text>Post not found</Text>
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
      </Head>
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

        <Image
          style={{ width: '100%', aspectRatio: 16 / 9 }}
          source={{ uri: `/thumbnails/${post.thumbnail}` }}
          alt={post.title}
        />
        <Markdown>{post.content}</Markdown>
      </ScrollView>
    </>
  )
}

export default PostDetailsPage