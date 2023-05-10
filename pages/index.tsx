import prompts from "@/helpers/prompts";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  Link,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useCallback, useState } from "react";
import { BsImage } from "react-icons/bs";
import GithubButton from "./src/components/index/GithubButton";

const Home = () => {
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [prompt, setPrompt] = useState<string>(
    "futuristic tree house, hyper realistic, epic composition, cinematic, landscape vista photography by Carr Clifton & Galen Rowell, Landscape veduta photo by Dustin Lefevre & tdraw, detailed landscape painting by Ivan Shishkin, rendered in Enscape, Miyazaki, Nausicaa Ghibli, 4k detailed post processing, unreal engine"
  );

  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  // this method generates the images
  const generate = useCallback(async () => {
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

    setSelectedImg(data.images);
    setLoading(false);
  }, [prompt]);

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
          mt={[20, 20, 8]}
          roundedTop="lg"
          roundedBottom="lg"
          pb={8}
        >
          <Image
            opacity={loading ? 0.5 : 1}
            maxH={220}
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
                textAlign={"center"}
              >
                Get Amazing AI Cover Images In Seconds! 🔥
              </Heading>
            </Box>

            <InputGroup size="md" w={{ base: "full", md: "30rem" }}>
              <Input
                py={4}
                borderColor={"gray.500"}
                focusBorderColor="gray.500"
                _hover={{ borderColor: "gray.500" }}
                variant="outline"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                placeholder="Enter an image prompt here"
              />
            </InputGroup>
            <Button
              w={{ base: "full", md: "30rem" }}
              _hover={loading ? {} : { opacity: 0.8 }}
              _active={
                loading ? {} : { transform: "scale(0.98)", opacity: 0.7 }
              }
              isLoading={loading}
              transitionDuration="200ms"
              bg="#ff6b96"
              color="white"
              p={2}
              rounded="full"
              fontSize="lg"
              onClick={() => {
                generate();
              }}
              rightIcon={<BsImage />}
            >
              Generate Cover
            </Button>

            <Flex justify={"center"} wrap={["wrap", "wrap"]} gap={4}>
              {prompts.map((prompt, index) => (
                <Button
                  key={index}
                  rounded={"full"}
                  onClick={() => {
                    setPrompt(prompt.prompt);
                  }}
                  size="sm"
                  colorScheme="green"
                >
                  {prompt.label}{" "}
                </Button>
              ))}
            </Flex>
            <VStack gap={2}>
              <Text fontSize="xs" fontWeight="bold" textAlign={"center"}>
                Takes about 30 seconds. Generated with{" "}
                <Link
                  target="_blank"
                  href="https://tryleap.ai"
                  textDecoration={"underline"}
                >
                  Leap API
                </Link>{" "}
              </Text>
            </VStack>
          </VStack>
        </VStack>

        <GithubButton />
      </VStack>
    </>
  );
};

export default Home;
