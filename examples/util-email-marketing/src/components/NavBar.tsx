'use client'
import React from "react";
import {
  Divider,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Text,
} from "@aws-amplify/ui-react";

import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import useAuth from "../hooks/useAuth";

import styles from "../styles/NavBar.module.css";

Amplify.configure(awsExports);

export const NavBar = () => {

  const links = [
    { text: "Dashboard", href: "/dashboard" },
  ];
  return (
    <>

      <Flex
        className={styles.navBar}
        backgroundColor="neutral.90"
        position="sticky"
        width="100%"
        direction="row"
        color="font.inverse"
        paddingTop="small"
        paddingBottom="small"
        paddingLeft="large"
        paddingRight="large"
        alignItems="center"
      >
        <Link href="/" color="font.inverse">
          <Image
            src="/vercel.svg"
            alt="AWS Amplify Email Marketing"
            height={25}
            display="inherit"
          />
        </Link>
        <Flex
          justifyContent="space-between"
          grow={1}
          display={{ base: "none", medium: "inherit" }}
        >
          <Flex>
            {links.map((link) => (
              <Link key={link.href} href={link.href} color="font.inverse">
                {link.text}
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
