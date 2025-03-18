import { useState } from 'react';
import './style.css';
import rumiQuotes from '../apis/rumi_quotes.json';

type Quote = string | null;

export const Inspiration = () => {
  const [quote, setQuote] = useState<Quote>(null);

  const randomInspirationalQuotes = () => {
    const randomNum = Math.floor(Math.random() * 82) + 1;
    const newQuote = rumiQuotes.quotes[randomNum].text;
    console.log(newQuote);
    setQuote(newQuote);
  };

  return (
    <div className='insp_main'>
      <div className='insp_header'>
        <h2>Find today's Rumi word</h2>
      </div>
      <div className='insp_box' onClick={randomInspirationalQuotes}>
        <img src='insp_cloud.gif' />
      </div>
      {quote ? (
        <div className='insp_result'>
          <p>{quote}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
