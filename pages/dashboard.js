import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { BiDonateHeart } from "@react-icons/all-files/bi/BiDonateHeart";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { AppShell } from '@saas-ui/app-shell';
import Image from 'next/image';
import Link from 'next/link';
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import { Page, PageBody } from '@saas-ui/pro';
import { Box, Menu, MenuList, MenuButton, MenuItem, Container, Spacer, IconButton, Card, CardBody, SimpleGrid, HStack } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { Sidebar, SidebarSection, SidebarToggleButton, NavItem} from '@saas-ui/sidebar';

// import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
// import { useEffect, useState } from 'react';

export default function Dashboard() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // const { status } = useSession({
  //   require: true,
  //   onUnauthenticated(){
  //     router.push('/');
  //   },
  // })
  // if(status === "authenticated"){
  //   return 'user not authenticated'
  // }
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
    return(
      <HStack height="100vh" width="100vw" justifyItems="stretch" alignItems="stretch">
          <AppShell variant="static" minH="100%"
            sidebar={
              <Sidebar>
                <SidebarToggleButton />
                <SidebarSection direction="row">
                <Image src="/images/favicon-96x96.png" height={30} width={30} alt=""/>
                
                  <Spacer />
                  <Menu>
                    <MenuButton as={IconButton} icon={<FaUserCircle size={'2em'}/>} variant="ghost"/>
                    <MenuList>
                    <MenuItem>Home</MenuItem>
                    <Link href="/"> <MenuItem>Sign out</MenuItem></Link>
                    </MenuList>
                  </Menu>
                </SidebarSection>
                <SidebarSection aria-label="Main">
                    <NavItem icon={<FiHome />} isActive>Dashboard</NavItem>
                    <Link href='/donation'><NavItem icon={<BiDonateHeart />} >Donation</NavItem></Link>
                    <Link href='/donor'><NavItem icon={<FiUser/>}>Donor</NavItem></Link>
                </SidebarSection>
              </Sidebar>
            }
          >
          <Page height="400px" contentWidth="full" position="sticky"
                      title="DonorKite"
                      width="80vw"
                      overflow="hidden">
              
                <PageBody>
                  <Box as="main" flex="1" py="2" px="4" overflow="auto">
                  <Container mt="40px" maxW="container.lg" ml="40px">
                      <SimpleGrid columns={3} gap="3">
                        <Card variant="solid">
                            <CardBody>
                            <Stat>
                                <StatLabel>Collected Fees</StatLabel>
                                <StatNumber>£0.00</StatNumber>
                                <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                            </Stat>
                            </CardBody>
                        </Card>
                        <Card variant="outline">
                            <CardBody>
                            <Stat>
                                <StatLabel>Collected Fees</StatLabel>
                                <StatNumber>£0.00</StatNumber>
                                <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                            </Stat>
                            </CardBody>
                        </Card>
                        <Card variant="solid">
                            <CardBody>
                            <Stat>
                                <StatLabel>Collected Fees</StatLabel>
                                <StatNumber>£0.00</StatNumber>
                                <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                            </Stat>
                            </CardBody>
                        </Card>
                        </SimpleGrid>
                    </Container>
                  </Box>
                </PageBody>
          </Page>
      </AppShell>
    </HStack>
    )
}
export async function getServerSideProps(context){
  const session = await getSession({ req: context.req });
  if(session){
    return{
      redirect: {
        destination: '/',
        permanet: false,
      },
    };
  }
  return{
    props: {session}
  }
}