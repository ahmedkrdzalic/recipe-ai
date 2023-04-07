import React from "react";

function TagItem({
  tagKey,
  tag,
  removeTag,
}: {
  tagKey: number;
  tag: string;
  removeTag: (index: number) => void;
}) {
  return (
    <div
      id="tag-item"
      className="py-1 px-2 bg-gray-500 inline-block text-white rounded-md font-light"
      key={tagKey}
    >
      <span id="text">{tag}</span>
      <span
        onClick={() => removeTag(tagKey)}
        id="closeBTN"
        className="ml-1 rounded-full text-[15px] w-[15px] h-[15px] bg-gray-700 inline-flex justify-center items-center cursor-pointer"
      >
        &times;
      </span>
    </div>
  );
}

export default TagItem;
