import { Leap } from "@leap-ai/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { nsfwCheck } from "../../helpers/nsfw";

const generate = async (req: NextApiRequest, res: NextApiResponse) => {
  // parse the `body` parameter for apiKey and prompt
  const { prompt } = req.body;

  // check for api key
  const api_key = process.env.API_KEY as string;

  if (!api_key) {
    res.status(400).json({ error: "Invalid request. Check API Key" });
    return;
  }

  // instantiate sdk
  const leap = new Leap(api_key);

  let images = <string[]>[];

  const { isNsfw } = nsfwCheck(prompt);

  if (isNsfw) {
    res.status(400).json({
      error: "NSFW prompt detected. Please try again with a different prompt.",
    });
  }

  const { data: image, error: imageError } = await leap.generate.generateImage({
    prompt: prompt,
    numberOfImages: 1,
    steps: 30,
    upscaleBy: "x1",
    height: 384,
    width: 832,
    modelId:
      Math.random() > 0.5
        ? "8b1b897c-d66d-45a6-b8d7-8e32421d02cf" // SD 1.5
        : "ee88d150-4259-4b77-9d0f-090abe29f650	", // SD 2.1
  });

  if (imageError) {
    res.status(500).json(imageError);
    return;
  }

  if (image) {
    image.images.forEach((image) => {
      images.push(image.uri);
    });
  }

  res.status(200).json({ images: images });
};

export default generate;
