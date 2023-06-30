// pages/api/positions.js
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

export default async (req, res) => {
  const { xLeft, xRight, yTop, yBottom, words } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  console.log(xLeft, xRight, yTop, yBottom, words);
  console.log(process.env.OPENAI_API_KEY);

  const prompt = `Given the following words: ${words.join(
    ", "
  )}, please evaluate each on a scale from 10 to 190 based on the axes labels of ${xLeft} (10) to ${xRight} (190) for x-axis and ${yBottom} (10) to ${yTop} (190) for y-axis. \\
  None of the words should overlap or have the same value. Return the results in JSON format with attributes 'text', 'x', and 'y'. \\
  Example: \\
  [
    { \\
        "text": "word", \\
        "x": 100, \\
        "y": 100 \\
    } \\
    ] \\
  Do not add a note. The JSON must be parsable by the client.`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    // need to figure out response object keys
    const message = response.data.choices[0].message.content;
    console.log(message);

    res.status(200).json(message);
  } catch (err) {
    console.log("🚫", err.message);
    res.status(500).json({ error: err.message });
  }
};
