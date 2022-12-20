import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clientPromise from "../lib/mongodb";
import {  faArrowLeft, faArrowRight, faChartLine, faCog, faDonate, faFile, faHome, faLocationArrow, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { AppShell } from '@saas-ui/app-shell';
import Image from 'next/image';
import Link from 'next/link';
import { Spacer, Container, Center } from '@chakra-ui/react';
import { Menu,MenuList, MenuButton, MenuItem} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, HStack } from '@chakra-ui/react';
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';
import { DataTable, DataTableProps, TableInstance, Column } from "@saas-ui/react";
import { Text, Box } from '@chakra-ui/react';

export default function Donation(users) {
    const columns  = [
          {
            accessor: 'donor',
            Header: 'Donor',
          },
          {
            accessor: 'amount',
            Header: 'Amount',
          },
          {
            accessor: 'type',
            Header: 'Type',
          },
          {
            accessor: 'fund',
            Header: 'Fund',
          },
          {
            accessor: 'date',
            Header: 'Date',
          },
    ];
    // const fetch = (users.map((user,index) => {

    // }))
    const data1 = [];
    let length1 = (users.users).length;
    for(let i=0; i< length1;i++){
        data1.push(users.users[i]);
    }
    return(
      <HStack
              height="100vh"
              width="100vw"
              justifyItems="stretch"
              alignItems="stretch"

            >
          <AppShell
              variant="static"
              minH="100%"
    sidebar={
      <Sidebar>
        <SidebarToggleButton />
        <SidebarSection direction="row">
        <Image src="/images/favicon-96x96.png" height={40} width={40} alt=""/>
          <Spacer />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={
                  <FontAwesomeIcon icon={faHome} />
              }
              variant="ghost"
            />
            <MenuList>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </SidebarSection>
        <SidebarSection aria-label="Main">
            <Link href='/dashboard'><NavItem icon={<FontAwesomeIcon icon={faHome} />} >Dashboard</NavItem></Link>
            <NavItem icon={<FontAwesomeIcon icon={faDonate} />} isActive>Donation</NavItem>
            <Link href='/donor'><NavItem icon={<FontAwesomeIcon icon={faUser} />}>Donor</NavItem></Link>
        </SidebarSection>
      </Sidebar>
    }
  >
    <Box
        as="header"
        borderBottomWidth="1px"
        py="2"
        px="4"
        position="sticky"
              width="100vw"
              justifyItems="stretch"
              alignItems="stretch"
      >
      <p>Donation</p>
      </Box>
    <Box as="main" flex="1" py="2" px="4" overflow="auto" >
    <Box overflow="auto">
        <Container mt="40px" maxW="container.lg" ml="40px">
            <DataTable columns={columns} data={data1} isSortable />
        </Container>
        </Box>
    {/* <Center p="10" w="900px">
            <DataTable columns={columns} data={data1} isSortable />
    </Center> */}
    </Box>
          </AppShell>
        </HStack>
    )
}
export async function getServerSideProps(context) {
    const client = await clientPromise;
    const db = client.db("nextjs-mongodb-demo");
    let users = await db.collection("donations").find({}).toArray();
    users = JSON.parse(JSON.stringify(users));
    return {
      props: { users },
    };
  }