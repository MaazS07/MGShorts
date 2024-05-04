import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Text,
  Input,
  Textarea,
  Stack,
  Grid,
  GridItem,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Home() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    image: null,
    title: '',
    content: '',
  });
  const [editData, setEditData] = useState({ id: null, title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/api/content');
    setData(response.data);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewData({ ...newData, image: selectedImage });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', newData.image);
    formData.append('title', newData.title);
    formData.append('content', newData.content);

    const response = await axios.post('http://localhost:3000/api/content', formData);

    setData([response.data, ...data]);
    setNewData({ image: null, title: '', content: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/content/${id}`);
    fetchData();
  };

  const handleUpdate = async (id) => {
    try {
      const updatedData = await axios.put(`http://localhost:3000/api/content/${id}`, {
        title: editData.title,
        content: editData.content,
      });
      fetchData();
      setEditData({ id: null, title: '', content: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditData({ id: item._id, title: item.title, content: item.content });
    setIsEditing(true);
  };

  return (
    <Box p={5}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 3fr' }} gap={5}>
        <Box>
          <form onSubmit={handleSubmit}>
            <Input
              type="file"
              onChange={handleImageChange}
              mb={3}
            />
            {newData.image && (
              <SimpleGrid columns={1} spacing={2} mb={3}>
                <Image src={URL.createObjectURL(newData.image)} alt="Selected Image" boxSize="20vw" objectFit={"contain"} />
              </SimpleGrid>
            )}
            <Input
              type="text"
              placeholder="Title (up to 10 words)"
              value={newData.title}
              onChange={(e) => setNewData({ ...newData, title: e.target.value })}
              mb={3}
            />
            <Textarea
              placeholder="Content (up to 80 words)"
              value={newData.content}
              onChange={(e) => setNewData({ ...newData, content: e.target.value })}
              mb={3}
              height={"25vh"}
            />
           <Button type="submit" bg="black" color="grey" width="100%">
              Add
            </Button>
          </form>
        </Box>

        <Stack spacing={3} width="100%">
          {data.map((item) => (
            <Flex
              key={item._id}
              bg="white"
              p={3}
              borderRadius="md"
              alignItems="center"
              justify="space-between"
              _hover={{ boxShadow: 'lg' }}
            >
              <Image
                src={`http://localhost:3000/uploads/${item.image.data}`}
                alt={item.title}
                boxSize={{ base: '50px', md: '70px' }}
                mr={2}
              />

              <Box>
                <Text fontWeight="bold">{item.title}</Text>
                <Text>{item.content}</Text>
              </Box>

              <Flex>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleEditClick(item)}
                  mr={2}
                >
                  <FaEdit />
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(item._id)}>
                  <FaTrash />
                </Button>
              </Flex>
            </Flex>
          ))}
        </Stack>

        {isEditing && (
          <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Content</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  type="text"
                  placeholder="Edit Title"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  mb={3}
                />
                <Textarea
                  placeholder="Edit Content"
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  mb={3}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => handleUpdate(editData.id)}>
                  Update
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Grid>
    </Box>
  );
}

export default Home;
