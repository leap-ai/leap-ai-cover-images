import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { posthog } from "posthog-js";
import { BsCloudDownload } from "react-icons/bs";

function PopupModal({
  isOpen,
  onOpen,
  onClose,
  selectedImg,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedImg: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent
        fontFamily={"Verdana"}
        bg={"#fff"}
        color={"#1c1c1c"}
        w={900}
      >
        <ModalBody pb={10}>
          <Image
            mt={10}
            src={selectedImg}
            width={500}
            rounded={"md"}
            alt="Wallpaper example"
            mx={"auto"}
          />
          <VStack gap={6}>
            <Text
              mt={10}
              w={"100%"}
              textAlign={"center"}
              fontWeight={"bold"}
              fontSize={"2xl"}
            >
              Generate AI images & headshots with Leap AI
            </Text>

            <Button
              color={"#fff"}
              bg={"#000"}
              fontSize={"lg"}
              w={{ base: "full", md: "30rem" }}
              h={12}
              transitionDuration="200ms"
              _hover={{ opacity: 0.8 }}
              onClick={() => {
                posthog.capture("clickedLeapCTA");
                window.open(
                  "https://www.tryleap.ai/use-cases/backgrounds-headers?utm_source=cover-images",
                  "_blank"
                );
              }}
              leftIcon={
                <Image
                  objectFit={"contain"}
                  src={"/leap.jpg"}
                  width={8}
                  rounded={"md"}
                />
              }
            >
              Get Started Free
            </Button>

            <VStack mt={4} gap={2}>
              <Button
                w={{ base: "full", md: "30rem" }}
                transitionDuration="200ms"
                p={2}
                colorScheme="grey"
                opacity={0.8}
                variant="outline"
                _hover={{ opacity: 0.8 }}
                _active={{ transform: "scale(0.98)", opacity: 0.7 }}
                fontSize="lg"
                onClick={() => {
                  posthog.capture("clickedDownload");
                  window.open(selectedImg, "_blank");
                }}
                rightIcon={<BsCloudDownload />}
              >
                Download
              </Button>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default PopupModal;
