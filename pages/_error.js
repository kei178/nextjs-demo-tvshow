const CustomError = ({ statusCode }) => {
  if (statusCode === 404) {
    return <h1>Not Found</h1>;
  }

  return <div>Oops! Something went wrong...</div>;
};

CustomError.getInitialProps = ({ err, res }) => {
  return { statusCode: res ? res.statusCode : err ? err.statusCode : 404 };
};

export default CustomError;
