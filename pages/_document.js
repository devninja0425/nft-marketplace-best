import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <link rel="stylesheet" href="assets/css/style.css"/>
            {/* <link rel="stylesheet" href="assets/css/vendor/all.min.css"/>
            <link rel="stylesheet" href="assets/css/vendor/animate.min.css"/>
            <link rel="stylesheet" href="assets/css/vendor/bootstrap.min.css"/>
            <link rel="stylesheet" href="assets/css/vendor/icons.min.css"/>
            <link rel="stylesheet" href="assets/css/vendor/slider.min.css"/> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/assets/js/vendor/core.min.js"></script>
        
          <script src="/assets/js/vendor/popper.min.js"></script>
          <script src="/assets/js/vendor/bootstrap.min.js"></script>

          <script src="/assets/js/vendor/all.min.js"></script>
          <script src="/assets/js/vendor/slider.min.js"></script>
          <script src="/assets/js/vendor/countdown.min.js"></script>
          <script src="/assets/js/vendor/shuffle.min.js"></script>

          {/* <script src="/assets/js/main.js"></script> */}
          
        </body>
      </Html>
    )
  }
}

export default MyDocument