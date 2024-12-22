export const setCopyCodeButton = (body: string) => {
  return body.replaceAll(
    /<pre.+?><code.+?>([\s\S]+?)<\/code><\/pre>/g,
    (codeTagString) => {
      return `<div class="code-wrapper">
        ${codeTagString}
        <button class="postBody_copyToClipboard" tabindex="-1">
          <img src="/img/code_copy.svg" width="20" height="20">
        </button>
      </div>`;
    },
  );
};

export const handleClick_CopyToClipboard = async (event: MouseEvent) => {
  const el = event.target as HTMLButtonElement;
  const parentEl = el.parentElement?.parentElement;
  const preEl = parentEl?.querySelector("code");
  // クリップボードにコピー
  if (preEl?.textContent) {
    await navigator.clipboard.writeText(preEl?.textContent ?? "");

    const tooltipClass = "copy-tooltip";

    // すでに表示されている場合は削除する
    const currentTooltipEl = parentEl?.querySelector(`div.${tooltipClass}`);
    if (currentTooltipEl) currentTooltipEl.remove();

    const newTooltipEl = document.createElement("div");
    newTooltipEl.classList.add(tooltipClass);
    newTooltipEl.innerText = "保存しました";
    parentEl?.appendChild(newTooltipEl);

    // 5秒後に非表示にする
    setTimeout(() => {
      if (newTooltipEl) newTooltipEl.remove();
    }, 3000);
  }
};
