import { Fragment } from "react";

const StarRate = ({ rate, Click, style }) => {
  return (
    <Fragment>
      {[...Array(5)].map((v, i) => (
        <span key={i} onClick={() => Click(i)} style={style}>
          {rate > i ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99996 0L10.9832 6.10368H17.401L12.2089 9.87597L14.1921 15.9796L8.99996 12.2074L3.80786 15.9796L5.79106 9.87597L0.59896 6.10368H7.01675L8.99996 0Z"
                fill="#e0e03b"
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99996 0L10.9832 6.10368H17.401L12.2089 9.87597L14.1921 15.9796L8.99996 12.2074L3.80786 15.9796L5.79106 9.87597L0.59896 6.10368H7.01675L8.99996 0Z"
                fill="#9d9faa"
              />
            </svg>
          )}
        </span>
      ))}
    </Fragment>
  );
};

export default StarRate;
