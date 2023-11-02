import React, { useCallback, useState } from "react";

import {
  Button,
  Divider,
  Icon,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import { useModal } from "./base/useModal";
import SearchResults from "./SearchResults";

export default function SearchButton() {
  const { Modal, toggleModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchTerm = useCallback(debounce(setSearchTerm, 500), []);
  return (
    <>
      <Button margin="medium" onClick={toggleModal}>
        <Icon
          pathData="M142.938822,125.786164 L133.905089,125.786164 L130.703259,122.698685 C142.296993,109.25125 148.66898,92.0834126 148.656375,74.3281875 C148.656375,33.2778631 115.378512,0 74.3281875,0 C33.2778631,0 0,33.2778631 0,74.3281875 C0,115.378512 33.2778631,148.656375 74.3281875,148.656375 C92.7387078,148.656375 109.662664,141.909663 122.698685,130.703259 L125.786164,133.905089 L125.786164,142.938822 L182.961692,200 L200,182.961692 L142.938822,125.786164 Z M73.5042735,124.786325 C45.1282051,124.786325 22.2222222,101.880342 22.2222222,73.5042735 C22.2222222,45.1282051 45.1282051,22.2222222 73.5042735,22.2222222 C101.880342,22.2222222 124.786325,45.1282051 124.786325,73.5042735 C124.786325,101.880342 101.880342,124.786325 73.5042735,124.786325 Z"
          viewBox={{
            width: 200,
            height: 200,
          }}
          ariaLabel="Search"
        />
        <Text marginLeft={"small"}>Search Posts</Text>
      </Button>
      <Modal title="Search Results">
        <View
          maxWidth="720px"
          style={{
            overflowX: "hidden",
          }}
        >
          <TextField
            label="Search"
            labelHidden
            marginBottom="relative.xxxs"
            marginTop="1px"
            marginLeft="1px"
            marginRight="1px"
            size="small"
            onChange={(e) => debouncedSetSearchTerm(e.target.value)}
            placeholder="Search"
          />
          <Divider
            style={{
              opacity: 0.0,
            }}
            orientation="horizontal"
            width="100vw"
          />
          <View padding="2px">
            <SearchResults searchText={searchTerm} />
          </View>
        </View>
      </Modal>
    </>
  );
}

function debounce(fn: any, delay: number) {
  let timeoutID: any;
  return function (...args: any) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
