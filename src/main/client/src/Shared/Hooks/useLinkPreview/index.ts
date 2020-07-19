import { useState, useEffect } from "react";

import { document } from "../../APIs";

export default function useLinkPreview(url: string) {
  const [preview, setPreview] = useState<LinkPreview>(null);
  useEffect(() => {
    document.load(url).then((doc) => {
      console.log(doc);
    });
  }, [url]);
  return preview;
}

interface LinkPreview {
  img: string;
  title: string;
  body: string;
}
