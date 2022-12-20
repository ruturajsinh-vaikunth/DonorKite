import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowLeft, faArrowRight, faChartLine, faCog, faDonate, faFile, faHome, faLocationArrow, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { AppShell } from '@saas-ui/app-shell';
import Image from 'next/image';
import Link from 'next/link';
import { Spacer } from '@chakra-ui/react';
import { Menu,MenuList, MenuButton, MenuItem, Container} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, HStack } from '@chakra-ui/react';
  import {
    Sidebar,
    SidebarSection,
    SidebarToggleButton,
    SidebarOverlay,
    NavGroup,
    NavItem,
  } from '@saas-ui/sidebar';
import { Text, Box } from '@chakra-ui/react';

export default function Donor() {
    return(
      <HStack
              height="100vh"
              width="100vw"

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
            <Link href='/donation'><NavItem icon={<FontAwesomeIcon icon={faDonate} />} >Donation</NavItem></Link>
            <NavItem icon={<FontAwesomeIcon icon={faUser} />}isActive>Donor</NavItem>
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
      >
      <p>Donors</p>
      </Box>
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
          </AppShell>
        </HStack>
    )
}