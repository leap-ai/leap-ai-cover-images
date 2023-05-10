# Leap AI Cover Images 🎆

Welcome! This repo has a working implementation of how to generate AI cover images using Leap AI. ✨

Try it out [here](https://ai-cover-images.vercel.app/)!

Get started by forking this repository (button top right), and downloading it to your computer. From there follow the below :)

### Setup

1. Add your credentials in .env, following the .envExample file
2. Head to `pages/index.tsx` for editing text, prompts, and colors to match your theme
3. Adjust image prompts in `helpers/prompts.ts`
4. Adjust the number of images generated w/ the numberOfImages parameter in `/pages/api/generate`

### Run it locally

1. Open the terminal
2. Run `npm install` to grab the necessary packages
3. Hit `npm run dev` to start your server on `http://localhost:3000`
4. Click the change image button
5. Pick a style to generate

### Deploy to the world

1. Push all your changes to Github (or another git provider)
2. Head to vercel.app, import your repo, and hit deploy
3. note: you will need vercel pro plan or `/pages/api/generate` call will likely timeout after 10 sec. You can also deploy on [Zeet](https://zeet.co/) to avoid this issue.

### You've got off localhost 👏

This is huge! You've got an AI image app running on the web, and you can share it with the world.

if you got value from this -- plz give us a star 🙂⭐

built w/ ❤️ by [alex](https://twitter.com/thealexshaq) with [Leap AI](https://tryleap.ai)
