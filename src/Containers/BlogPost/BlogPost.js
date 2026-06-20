import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import moment from "moment";
import Markdown from "markdown-to-jsx";
import readingTime from "reading-time";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./BlogPost.css";
import { config } from "../../config";

export default function BlogHome() {
  const [blog, setBlogs] = useState(null);
  const { issueNumber } = useParams();
  const issueNum = parseInt(issueNumber);

  useEffect(() => {
    getBlogsFromGithubIssues();
  }, []);

  function getBlogsFromGithubIssues() {
    const client = new ApolloClient({
      uri: "https://api.github.com/graphql",
      headers: {
        authorization: `Bearer ${config.githubToken}`
      },
      cache: new InMemoryCache()
    });

    client
      .query({
        query: gql`
          {
            repository(owner: "${config.githubUserName}", name: "${config.githubRepo}") {
              issue(number: ${issueNum}) {
                title
                body
                bodyHTML
                url
                bodyText
                number
                author {
                  url
                  avatarUrl
                  login
                }
                updatedAt
                id
              }
            }
          }
        `
      })
      .then(result => {
        setBlogs(result.data.repository.issue);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const HyperLink = ({ children, ...props }) => (
    <a href={props.href} target="_blank" rel="noreferrer" className="blog-post-anchor">
      {children}
    </a>
  );

  const CodeBlock = ({ children }) => (
    <SyntaxHighlighter language="typescript" style={docco}>
      {children.props.children}
    </SyntaxHighlighter>
  );

  return (
    <div>
      {blog && blog.title && (
        <div className="blog-view">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="author-details">
            <img className="avatar" src={blog.author.avatarUrl} alt={blog.author.login} />
            <div>
              <p className="author-name">{blog.author.login}</p>
              <p className="blog-date">
                {moment(blog.updatedAt).format("DD MMM YYYY")} &middot;{" "}
                {readingTime(blog.body).minutes} Min Read &middot;{" "}
                <a href={blog.url} target="_blank" rel="noreferrer">View On GitHub</a>
              </p>
            </div>
          </div>
          <Markdown
            options={{
              overrides: {
                a: { component: HyperLink },
                pre: { component: CodeBlock }
              }
            }}
          >
            {blog.body}
          </Markdown>
        </div>
      )}
    </div>
  );
}
