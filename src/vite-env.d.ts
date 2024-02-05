/// <reference types="vite/client" />


type LangType = "ja" | "hi" | "es" | "fr";

type WordType = {
  word: string,
  meaning: string,
  options: string[];
}
interface StateType  {
  loading: boolean;
  result: string[];
  words: WordType[];
  error?: string;
}

type FetchedDataType = {
  translations: {
    text: string;
  }[]
}

 type usertype = {
     firstName: String,
     LastName: String,
     email: String,
 }

interface Userinterface {
    Authenticated: boolean,
    User: usertype,
}