/* eslint-disable */

import { FC, memo } from 'react'
import ReactMarkdown, { Options, Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Divider, Link } from "@aws-amplify/ui-react";

const components: Components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={vs}
        language={match[1]}
        PreTag="div"
        remarkPlugins={[remarkGfm]}
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  img({ node, ...props }: any) {
    return <img {...props} style={{ width: "100%" }} />;
  },
  a({ node, ...props }: any) {
    return <Link {...props} />;
  },
  hr({ node, ...props }: any) {
    return <Divider marginTop="large" marginBottom="large" {...props} />;
  },
};

const MemoizedReactMarkdown: FC<Options> = memo(
  (props) => (
    <div style={{ width: "100%" }}>
      <ReactMarkdown 
        {...props} 
        components={components} 
        remarkPlugins={[remarkFootnotes as any]} />
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);

export default MemoizedReactMarkdown;