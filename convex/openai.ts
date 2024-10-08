import { action } from "./_generated/server";
import { v } from "convex/values";

import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, {voice,input}) => {
    const mp3 = await openai.audio.speech.create({
        model:"tts-1",
        voice: voice as SpeechCreateParams['voice'],
        input,
    })

    const buffer = await mp3.arrayBuffer();

    return buffer;
  },
});

export const generateThumbnailAction = action({
  args: { prompt:v.string() },
  handler: async (_, { prompt }) => {
    const response = await openai.images.generate({
      model:"dall-e-3",
      prompt: prompt,
      size:"1024x1024",
      quality:"standard",
      n:1,
    })

    const image_url = response.data[0].url 
    if(!image_url){
      throw new Error('Error generating thumbnail');
    }
    
    const imageResponse = await fetch(image_url);
    const buffer = await imageResponse.arrayBuffer();

    return buffer;
  }
})