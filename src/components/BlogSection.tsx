"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/portfolio-data";

export default function BlogSection() {
  return (
    <article className="blog" data-page="blog">
      <header>
        <h2 className="h2 article-title">Blog</h2>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          {blogPosts.map((post, i) => (
            <motion.li
              key={post.title}
              className="blog-post-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <figure className="blog-banner-box">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    loading="lazy"
                  />
                </figure>

                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.category}</p>
                    <span className="dot" />
                    <time dateTime={post.date}>{post.dateFormatted}</time>
                  </div>

                  <h3 className="h3 blog-item-title">{post.title}</h3>
                  <p className="blog-text">{post.text}</p>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </section>
    </article>
  );
}
