'use client'

import { useSearchParams } from "next/navigation";
import { useState } from "react"

function CatImage(
  { isLoading, imgSrc, quote, author }: { isLoading: boolean, imgSrc: string, quote: string, author: string}
) {
  if (isLoading) {
    return (<h2>Loading...</h2>);
  }
  if (!imgSrc) {
    return (<h2>No Cat</h2>);
  }
  return (
    <figure className="flex bg-slate-100 rounded-xl p-2 shadow-2xl">
      <img className="h-96 rounded-none" src={imgSrc} alt="cat" />
      <div className="pt-6 p-8 text-left space-y-4 max-w-xs">
        <blockquote>
          <p className="text-2xl font-normal">
            “{quote}”
          </p>
        </blockquote>
        <div className="text-2x text-slate-700 italic text-right">
          -- {author}
        </div>
      </div>
    </figure>
  );
}

export default function CatAPP() {
  var catUrl = "https://cataas.com/cat";
  const breakingBadUrl = "https://api.breakingbadquotes.xyz/v1/quotes";
  const [catImg, setCatImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const params = useSearchParams();
  const useGIF = params.get('gif');
  if (useGIF) {
    catUrl += "/gif";
  }

  const fetcher = async () => {
    setIsLoading(true);
    fetch(catUrl)
      .then(async (resp) => {
        const data = await resp.blob();
        setCatImg(URL.createObjectURL(data));
        setIsLoading(false);
      });
    fetch(breakingBadUrl)
      .then((resp) => resp.json())
      .then((data) => {
        const { quote, author } = data[0];
        setQuote(quote);
        setAuthor(author);
      });
  };
  return (
    <div className="flex flex-col items-center bg-gray-5 p-8 h-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Heisenberg Cat</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
        disabled={isLoading}
        onClick={fetcher}
      >
        Give Me a Cat
      </button>
      <CatImage
        isLoading={false}
        imgSrc={catImg}
        quote={quote}
        author={author}
      />
      <div className="max-w-lg mx-auto p-4">
        <details className="open:bg-white open:ring-1 open:shadow-lg p-4 rounded-lg" open={false}>
          <summary className="text-sm leading-6 text-sky-500 font-semibold select-none">
            About
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-600">
            <p className="font-bold">Heisenberg Cat</p>
            <p>The most adorable face, saying the most ruthless words.</p>
            <p>Base on public api:</p>
            <ul className="list-disc text-sky-600 underline decoration-sky-600 ml-4">
              <li><a href="https://cataas.com/">cataas API</a></li>
              <li><a href="https://breakingbadquotes.xyz/">Breaking Bad quotes API</a></li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  )
}