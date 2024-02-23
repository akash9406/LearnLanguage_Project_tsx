import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

interface LangType {
  // Define the type for LangType if not already defined
  // ...
}

interface FetchedDataType {
  translations: { text: string }[];
  // Add other properties based on your actual response structure
  // ...
}

interface WordType {
  word: string;
  meaning: string;
  options: string[];
}

const generateMCQ = (
  meaning: { Text: string }[],
  idx: number
): string[] => {
  const correctAns: string = meaning[idx].Text;
  const meaningExceptcorrect = meaning.filter((i) => i.Text !== correctAns);
  const incorrectOptions: string[] = _.sampleSize(
    meaningExceptcorrect,
    3
  ).map((i) => i.Text);

  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);

  return mcqOptions;
};

export const translateWords = async (
  params: LangType
): Promise<WordType[]> => {
  try {
    const words = generate(8).map((i) => ({
      Text: i,
    }));

    const transkey = import.meta.env.VITE_MICROSOFT_TRANS;

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          'X-RapidAPI-Key': transkey,
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
      }
    );

    const receive: FetchedDataType[] = response.data;

    const arr: WordType[] = receive.map((i, idx) => {
      const options: string[] = generateMCQ(words, idx) as string[]; // Add type assertion
      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });

    return arr;
  } catch (error) {
    throw new Error("Some error");
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Array lengths are not equal");

  let matchingCount = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchingCount++;
  }

  return matchingCount;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
  const rapidKey = import.meta.env.VITE_RAPID_API;

  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': rapidKey,
        'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
      },
    }
  );

  return data;
};
