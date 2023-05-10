import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useCallback, useState } from "react";
import { BsImage } from "react-icons/bs";
import GenerateModal from "./src/components/index/GenerateModal";
import GithubButton from "./src/components/index/GithubButton";

const Home = () => {
  const [selectedImg, setSelectedImg] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // this method generates the images
  const generate = useCallback(async (prompt: string) => {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    const data = await response.json();
    if (data.error) {
      toast({
        title: "Error",
        description: data.error + " " + data.message,
        status: "error",
      });
      setLoading(false);
      return;
    }

    setImages(data.images);
    setLoading(false);
  }, []);

  return (
    <>
      <NextSeo
        title="Leap AI Cover Images"
        description="Leap AI Cover Images is a web app that uses the Leap AI API to generate AI Cover Images. It's built with Next.js, Chakra UI, and Leap AI."
      />
      <VStack
        minH="100vh"
        w="100vw"
        spacing={4}
        bg="#f0f0f0"
        px={4}
        paddingBottom={"100px"}
        color={"#1c1c1c"}
        fontFamily={"Verdana"}
      >
        <VStack
          maxW={700}
          w={"100%"}
          bg={"#fff"}
          mt={8}
          roundedTop="lg"
          roundedBottom="lg"
          pb={8}
        >
          <Image
            opacity={loading ? 0.5 : 1}
            maxH={200}
            w="100%"
            roundedTop="lg"
            objectFit="cover"
            src={
              selectedImg
                ? selectedImg
                : "https://replicate.delivery/pbxt/4kw2JSufYNV0AK76QGZHEI3EuUhkxTZ43O9rff2LWy4czSNhA/out.png"
            }
            alt="CoverImage"
          />
          <VStack px={6} gap={8}>
            <Box>
              <Heading
                mt={3}
                fontFamily={"Verdana"}
                fontWeight={"bold"}
                fontSize={"2xl"}
                textAlign={"left"}
              >
                Get Amazing AI Cover Images In Seconds! 🔥
              </Heading>
            </Box>

            <Button
              w={{ base: "full", md: "30rem" }}
              _hover={loading ? {} : { opacity: 0.8 }}
              _active={
                loading ? {} : { transform: "scale(0.98)", opacity: 0.7 }
              }
              transitionDuration="200ms"
              bg="#ff6b96"
              color="white"
              p={2}
              rounded="full"
              fontSize="lg"
              onClick={() => {
                onOpen();
              }}
              rightIcon={<BsImage />}
            >
              Change Cover
            </Button>
          </VStack>
        </VStack>
        <GenerateModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          loading={loading}
          images={images}
          generate={generate}
          setSelectedImg={setSelectedImg}
        />
        <GithubButton />

        <Box
          pos={"fixed"}
          bottom={0}
          w={"100%"}
          bg={"#fff"}
          color={"#1c1c1c"}
          zIndex={999}
          p={2}
        >
          <Box textAlign="center" fontSize="xl">
            <Text fontSize="xs" fontWeight="bold">
              Built with{" "}
              <Link
                target="_blank"
                href="https://tryleap.ai"
                textDecoration={"underline"}
              >
                Leap API
              </Link>{" "}
              by{" "}
              <Link target="_blank" href="https://twitter.com/thealexshaq">
                alex
              </Link>
              . Create your own AI image generator{" "}
              <Link
                target="_blank"
                href="https://github.com/alexschachne/leap-ai-cover-images"
                textDecoration={"underline"}
              >
                here
              </Link>{" "}
              🚀
            </Text>
          </Box>
        </Box>
      </VStack>
    </>
  );
};

export default Home;
