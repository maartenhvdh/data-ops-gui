export type DiffResponse = {
  html: string;
};

export const removeElementFromHtml = (
  htmlString: string,
  selector: string,
): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  doc.querySelector(selector)?.remove();
  return doc.documentElement.outerHTML;
};

/**
 * Adds <base> element to open iframe links in new window by default.
 * Appends <script>, sending height information to parent window via message layer for dynamic resizing.
 */
export const injectScripts = (htmlString: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const base = doc.createElement("base");
  base.target = "_blank";

  const script = doc.createElement("script");
  script.type = "text/javascript";
  // adding 5 to the final height fixed an issue wherein scrollbars sometimes appeared following recalculation
  script.text = `
      (() => {
        const sendHeight = () => {
          var height = document.documentElement.scrollHeight;
          window.parent.postMessage({ type: 'setHeight', height: height + 5 }, '*');
        }
  
        // send initial height
        window.addEventListener('load', sendHeight);
  
        // observe size changes
        var resizeObserver = new ResizeObserver(() => {
          sendHeight();
        });
  
        resizeObserver.observe(document.body);
  
        // cleanup
        window.addEventListener('unload', () => {
          resizeObserver.disconnect();
        });
      })();
    `;
  doc.body.appendChild(script);
  doc.head.appendChild(base);
  return doc.documentElement.outerHTML;
};
