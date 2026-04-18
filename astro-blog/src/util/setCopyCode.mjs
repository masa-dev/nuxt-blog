export const setCopyCodeButton = (body) => {
  return body.replaceAll(
    /<pre.+?><code.+?>([\s\S]+?)<\/code><\/pre>/g,
    (codeTagString) => {
      return `<div class="code-wrapper">\n${codeTagString}\n<button class="postBody_copyToClipboard" tabindex="-1">\n<img src="/img/code_copy.svg" width="20" height="20">\n</button>\n</div>`;
    },
  );
};

export const handleClick_CopyToClipboard = async (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest(".postBody_copyToClipboard");
  if (!(button instanceof HTMLButtonElement)) return;

  const wrapper = button.parentElement;
  const code = wrapper?.querySelector("code");

  if (!code?.textContent) return;

  await navigator.clipboard.writeText(code.textContent);

  const tooltipClass = "copy-tooltip";
  const currentTooltip = wrapper?.querySelector(`.${tooltipClass}`);
  currentTooltip?.remove();

  const tooltip = document.createElement("div");
  tooltip.classList.add(tooltipClass);
  tooltip.innerText = "保存しました";
  wrapper?.appendChild(tooltip);

  window.setTimeout(() => {
    tooltip.remove();
  }, 3000);
};
