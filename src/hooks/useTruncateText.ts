// @ts-nocheck
const useTruncateText = () => {
  const shortenTxt = (text, max) => {
    if (text?.length <= max) {
      return text;
    }
    return text?.slice(0, max) + " " + "...";
  };

  return {
    shortenTxt,
  };
};

export default useTruncateText;
