import { useEffect, useState } from "react";

type TocTitle = {
  title: string;
  isActive: boolean;
  isH3: boolean;
  anchorLink: string;
};

// サイドバーの目次メニュー
export default function PostSidebarToc() {
  const [titles, setTitles] = useState<TocTitle[]>([]);
  const [execOnceFlag, setExecOnceFlag] = useState<boolean>(false);

  const observerOptions = {
    root: null,
    rootMargin: "0% 0px -60% 0px",
    thredshold: 0,
  };

  useEffect(() => {
    const boxes = [
      ...document.querySelectorAll(
        ".post-content h1,.post-content h2,.post-content h3"
      ),
    ] as HTMLHeadingElement[];

    if (titles.length === 0) {
      boxes.forEach((box, index) => {
        box.id = `content-h-${index + 1}`;

        titles.push({
          title: box.textContent ?? "",
          isActive: false,
          anchorLink: `#content-h-${index + 1}`,
          isH3: box.tagName === "H3",
        });
      });

      setTitles([...titles]);
    }
  }, []);

  useEffect(() => {
    if (execOnceFlag) return;
    const boxes = [
      ...document.querySelectorAll(
        ".post-content h1,.post-content h2,.post-content h3"
      ),
    ] as HTMLHeadingElement[];

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting === true) {
          titles.forEach((t) => {
            if (t.anchorLink === "#" + entry.target.id) {
              t.isActive = true;
            } else {
              t.isActive = false;
            }
          });
          setTitles([...titles]);
          return;
        }
      }
    }, observerOptions);

    boxes.forEach((box) => observer.observe(box));

    setExecOnceFlag(true);
  }, [titles]);

  function classToString(obj: { [key: string]: boolean }) {
    const classList: string[] = [];
    for (const key in obj) {
      if (obj[key]) classList.push(key);
    }
    return classList.join(" ");
  }

  return (
    <div className="toc p-3 shadow mb-4">
      <ul className="p-0 m-0">
        {titles.map((title, index) => (
          <li key={index}>
            <a
              href={title.anchorLink}
              className={classToString({
                active: title.isActive,
                "sidebar-h3": title.isH3,
                "d-block": true,
              })}
            >
              {title.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
