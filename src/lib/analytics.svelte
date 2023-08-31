<script lang="ts">
    import { page } from '$app/stores'
  
    $: {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'G-0LEVZJRG89', {
          page_title: document.title,
          page_path: $page.url.pathname,
        })
      }
    }
  </script>
  
  <svelte:head>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-0LEVZJRG89">
    </script>
    <script>
      window.dataLayer = window.dataLayer || []
  
      function gtag() {
        dataLayer.push(arguments)
      }
  
      gtag('js', new Date())
      gtag('config', 'G-0LEVZJRG89')
    </script>

    <script type="text/javascript">
        window._mfq = window._mfq || [];
        (function() {
        var mf = document.createElement("script");
        mf.type = "text/javascript"; mf.defer = true;
        mf.src = "//cdn.mouseflow.com/projects/d82822ad-d5f1-4072-afad-48f94cad1f7c.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
        })();
    </script>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
  </svelte:head>
  