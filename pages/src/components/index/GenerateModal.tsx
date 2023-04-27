import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import prompts from "@/helpers/prompts";

function GenerateModal({
  isOpen,
  onOpen,
  onClose,
  loading,
  images,
  generate,
  setSelectedImg,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        fontFamily={"Verdana"}
        bg={"#fff"}
        color={"#1c1c1c"}
        w={900}
      >
        <ModalCloseButton />

        <ModalBody pb={10}>
          <VStack gap={4}>
            <Text
              mt={4}
              w={"100%"}
              textAlign={"left"}
              fontWeight={"bold"}
              fontSize={"lg"}
            >
              Generate cover image with AI
            </Text>
            {!loading && (
              <Flex justify={"center"} wrap={["wrap", "wrap"]} gap={4}>
                {prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    rounded={"full"}
                    onClick={() => {
                      generate(prompt.prompt);
                    }}
                    size="sm"
                    isLoading={loading}
                    colorScheme="green"
                  >
                    {prompt.label}{" "}
                  </Button>
                ))}
              </Flex>
            )}
            {loading && (
              <VStack mt={4} gap={2}>
                <Text
                  w={"100%"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  fontSize={"lg"}
                >
                  Loading...
                </Text>
                <Text
                  w={"100%"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  fontSize={"md"}
                >
                  Takes about 30 seconds
                </Text>
                <Spinner />
              </VStack>
            )}

            <Flex
              gridGap={"16px"}
              h="auto"
              flexDir={"row"}
              flexWrap={"wrap"}
              justify={"center"}
            >
              {images.map((image: string, index: number) => (
                <Box
                  _hover={{
                    cursor: "pointer",
                    border: "3px solid #ff6b96",
                    borderRadius: "15px",
                  }}
                  maxW={"170px"}
                  mb={2}
                  key={image}
                  className="image-item"
                  position="relative"
                  onClick={() => {
                    setSelectedImg(image);
                    onClose();
                  }}
                >
                  <Image
                    src={image}
                    objectFit="contain"
                    borderRadius={"12px"}
                  />
                </Box>
              ))}
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default GenerateModal;
