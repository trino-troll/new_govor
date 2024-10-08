import Script from 'next/script'

const ChatForSite = () => (
  <>
    <Script
      id="chatForSite"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function (m, e, t, r, i, k, a) {
            if (e.getElementById('chat-widget')) return;
            m[i] = m[i] || function () {
              (m[i].a = m[i].a || []).push(arguments)
            };
            m[i].l = 1 * new Date();
            k = e.createElement(t);
            a = e.getElementsByTagName(t)[0];
            k.async = 1;
            k.src = r;
            k.onload = function() {
              window.chatInit && window.chatInit('cm0lg5q9e0001e0og9p2yc4pa');
            };
            a.parentNode.insertBefore(k, a);
          })(window, document, 'script', 'https://dev.llcibs.ru/chat-widget.js', 'chatInit');
        `,
      }}
    />
  </>
)

export default ChatForSite
