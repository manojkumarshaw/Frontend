// import axios, { Axios } from "axios";
import { fetchBlogs } from "@/http";
import axios from "axios";
import React from "react";

const Example = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        {
          console.log(post.attributes.slug );
        }
      })}
    </div>
  );
};

export async function getStaticProps() {
  // const res = await fetch("http://127.0.0.1:1337/api/blogs");
  const res = fetchBlogs;

  const posts = await res.data;
  console.log(await posts);

  // console.log(posts + "getStateProp")

  return {
    props: {
      posts,
    },
  };
}
export default Example;
