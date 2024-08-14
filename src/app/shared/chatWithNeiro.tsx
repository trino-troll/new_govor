// src/components/YandexMetrika.tsx
import Script from 'next/script'

const ChatWithNeiro = () => (
  <>
    <Script
      id="chat-with-neiro"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          <!-- Start https://llcibs.ru -->
            <script>
              (function(m,e,t,r,i,k,a){m[i]=m[i]function(){
              (m[i].a=m[i].a[]).push(arguments)},m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://dev.llcibs.ru/chat-widget.js", "chatInit");

              chatInit('clztjayuu0001bdfo0jnd4qs1');
            </script>
            <!-- End https://llcibs.ru -->
        `,
      }}
    />
    <noscript>
      <div>Чат</div>
    </noscript>
  </>
)

export default ChatWithNeiro
