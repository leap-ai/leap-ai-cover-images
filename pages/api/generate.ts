import { Leap } from "@leap-ai/sdk";
import { NextApiRequest, NextApiResponse } from "next";

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

  const { data: image, error: imageError } = await leap.generate.generateImage({
    prompt: prompt,
    numberOfImages: 4,
    steps: 30,
    upscaleBy: "x1",
    height: 360,
    width: 800,
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
