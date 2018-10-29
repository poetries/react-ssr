
export const renderHTML = (content,store,cssStr)=>`
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#000000">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <link rel="shortcut icon" href="/favicon.ico">
        <title>好物为您聚集个大平台的优惠商品，让你跟便捷得找到你想要的宝物</title>
        <style>${cssStr}</style>

        <script>
          window.onload=function(){
              if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
                  bodyTag = document.getElementsByTagName('body')[0];
                  bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
              }
              setTimeout(function() {
                  window.scrollTo(0, 1)
              }, 0);
          };
        </script>
      </head>
      <body>
      <div id="root">${content}</div>
      <script>
        window.context = {
          state: ${JSON.stringify(store.getState())}
        }
      </script>
      <script src="/index.js"></script>
      </body>
  </html>
`
