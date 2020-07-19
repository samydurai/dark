import * as React from "react";
import { memo } from "react";

const regex = new RegExp(
  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
);

const getUrl = (url: string) => {
  if (url.indexOf("://") > -1) {
    return url;
  } else {
    return "//" + url;
  }
};

const format = (word: string) => {
  if (regex.test(word)) {
    return (
      <>
        <a href={getUrl(word)} target="_blank" rel="noreferrer">
          {word}
        </a>{" "}
      </>
    );
  }
  return <>{word} </>;
};

const checkProps = (
  prevProps: FormattedMessageProps,
  nextProps: FormattedMessageProps
) => {
  return prevProps.message === nextProps.message;
};

function FormattedMessage({ message }: FormattedMessageProps) {
  const words = message.split(" ");
  return <>{words.map((word) => format(word))}</>;
}

interface FormattedMessageProps {
  message: string;
}

export default memo(FormattedMessage, checkProps);
