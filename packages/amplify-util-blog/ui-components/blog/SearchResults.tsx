import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Flex } from "@aws-amplify/ui-react";
import { deserializeModel } from "@aws-amplify/datastore/ssr";
import { GraphQLQuery } from "@aws-amplify/api";

import * as queries from "./../../graphql/queries";
import { SearchPostsQuery } from "./../../API";
import { default as CommonPostCardCollection } from "./CommonPostCardCollection";
import { Post } from "./../../models";

interface SearchResultsProps {
  searchText: string;
}

const SearchResults = ({ searchText }: SearchResultsProps) => {
  const [searchResults, setSearchResults] = useState<Post[]>();

  const searchPost = async (text: string) => {
    if (searchText === "") return;

    const results = await API.graphql<GraphQLQuery<SearchPostsQuery>>({
      query: queries.searchPosts,
      variables: {
        searchParameters: JSON.stringify({
          q: `*${text}*`,
          query_by: "title",
        }),
      },
    });
    if (results.data?.searchPosts) {
      try {
        const posts = JSON.parse(results.data?.searchPosts).hits.map(
          (hit: any) => {
            return deserializeModel(Post, hit.document);
          }
        );
        setSearchResults(posts);
      } catch (error) {
        console.error("could not parse search results");
      }
    } else {
      alert("no results found");
    }
  };

  useEffect(() => {
    searchPost(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column">
      {searchResults && <CommonPostCardCollection posts={searchResults} />}
      {!searchResults && <p>No results found</p>}
    </Flex>
  );
};

export default SearchResults;
