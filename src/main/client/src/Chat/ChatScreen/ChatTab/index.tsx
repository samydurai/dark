import * as React from "react";

export default function ChatTab(props: any) {
  const { value, index, userId } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{userId}</div>}
    </div>
  );
}
