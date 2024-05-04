import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from  "../assets/logo.png"
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  VStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  List,
  ListItem,
} from '@chakra-ui/react';
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';

const UserInterface = () => {
  const [data, setData] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('black', 'white');

  useEffect(() => {
    axios.get('http://localhost:3000/api/content')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box>
      {/* Navigation Bar */}
      <Flex p={4} bgColor={bgColor} color={color} alignItems="center">
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Menu"
          onClick={() => setDrawerOpen(true)}
          mr={2}
        />
        <Spacer />
        <Image
          src={logo}
          alt="MGShorts"
          boxSize="100px" // Adjust the size as needed
          objectFit="cover"
        />
        <Spacer />
        <IconButton
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          aria-label="Toggle Dark Mode"
          onClick={toggleColorMode}
          ml={2}
        />
      </Flex>

    
      <Flex   p={30} flexWrap="wrap" justifyContent="center" alignItems="center" flexDirection="column-reverse">
        {data.map(item => (
          <Box key={item._id} p={3} m={2} borderWidth="4px" borderColor="light-grey" borderRadius="lg" boxShadow="lg">
            <Flex flexDirection={{ base: "column", lg: "row" }} alignItems="center">
              <Image
                src={`http://localhost:3000/uploads/${item.image.data}` || "https://placehold.jp/700x300.png"}
                alt=""
                borderRadius="md"
                boxSize={{ base: "100%", lg: "250px" }}
                objectFit="cover"
                mb={4}
              />
              <VStack spacing={3} textAlign={{ base: "center", lg: "left" }}>
                <Heading as="h1" size="md" color="black" fontWeight="bold" textTransform="capitalize">
                  {item.title || 'Hello My title'}
                </Heading>
                <Text color="gray.600">
                  {item.content || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ...'}
                </Text>
              </VStack>
            </Flex>
          </Box>
        ))}
      </Flex>

      {/* Sidebar Drawer */}
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setDrawerOpen(false)}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Categories</DrawerHeader>
            <DrawerBody>
              <List>
                <ListItem>
                  <Button w="100%" variant="ghost" onClick={() => console.log("All clicked")}>
                    All
                  </Button>
                </ListItem>
                <ListItem>
                  <Button w="100%" variant="ghost" onClick={() => console.log("Politics clicked")}>
                    Politics
                  </Button>
                </ListItem>
                <ListItem>
                  <Button w="100%" variant="ghost" onClick={() => console.log("Sport clicked")}>
                    Sport
                  </Button>
                </ListItem>
                <ListItem>
                  <Button w="100%" variant="ghost" onClick={() => console.log("Education clicked")}>
                    Education
                  </Button>
                </ListItem>
              </List>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}

export default UserInterface;
