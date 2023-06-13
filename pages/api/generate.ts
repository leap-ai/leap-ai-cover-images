import { GenerateStateEnum, GenerateUpscaleEnum, Leap } from "@leap-ai/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { nsfwCheck } from "../../helpers/nsfw";

// check for api key
const api_key = process.env.API_KEY as string;

if (!api_key) {
  throw new Error("API_KEY environment variable not set.");
}

// instantiate sdk
const leap = new Leap({
  apiKey: api_key,
});
const generatorService = leap.images.generate;

const generate = async (req: NextApiRequest, res: NextApiResponse) => {
  // parse the `body` parameter for apiKey and prompt
  const { prompt } = req.body;

  let images = <string[]>[];

  const { isNsfw } = nsfwCheck(prompt);
  if (isNsfw) {
    res.status(400).json({
      error: "NSFW prompt detected. Please try again with a different prompt.",
    });
  }

  const random = Math.floor(Math.random() * 100);
  const modelId =
    random > 0 && random <= 30
      ? "8b1b897c-d66d-45a6-b8d7-8e32421d02cf" // SD 1.5
      : random > 30 && random < 65
      ? "eab32df0-de26-4b83-a908-a83f3015e971	" // realistic vision
      : "ee88d150-4259-4b77-9d0f-090abe29f650	"; // SD 2.1
  const result = await generatorService.createImages({
    parameters: {
      prompt: prompt,
      numberOfImages: 1,
      steps: 30,
      upscaleBy: GenerateUpscaleEnum.X1,
      height: 384,
      width: 832,
    },
    modelId,
  });

  let attempts = 0;
  while (true) {
    if (attempts > 10) {
      return res.status(500).json({
        error: "Failed to generate images, please try again.",
      });
    }

    const latestResult = await generatorService.findById({
      jobId: result.id,
      modelId,
    });

    if (latestResult.state === GenerateStateEnum.FINISHED) {
      latestResult.images.forEach((image) => {
        images.push(image.uri);
      });
      break;
    }

    if (latestResult.state === GenerateStateEnum.FAILED) {
      return res.status(500).json({
        error: "Failed to generate images, please try again.",
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    attempts++;
  }

  res.status(200).json({ images: images });
};

export default generate;
