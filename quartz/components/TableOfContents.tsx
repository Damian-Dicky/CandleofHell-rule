import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import legacyStyle from "./styles/legacyToc.scss"
import modernStyle from "./styles/toc.scss"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/toc.inline"
import { i18n } from "../i18n"
import sanitizeHtml from "sanitize-html"

// 定义一个函数来去除 HTML 标签
const removeHtmlTags = (text: string) => {
  return sanitizeHtml(text, {
    allowedTags: [], // 不允许任何标签
    allowedAttributes: {}, // 不允许任何属性
  })
}

interface Options {
  layout: "modern" | "legacy"
}

const defaultOptions: Options = {
  layout: "modern",
}

const TableOfContents: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }

  return (
    <div className={classNames(displayClass, "toc")}>
      <button type="button" id="toc" className={fileData.collapseToc ? "collapsed" : ""}>
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fold"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id="toc-content">
        <ul className="overflow">
          {fileData.toc.map((tocEntry) => (
            <li key={tocEntry.slug} className={`depth-${tocEntry.depth}`}>
              <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                {removeHtmlTags(tocEntry.text)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// 同样在 LegacyTableOfContents 组件中使用 removeHtmlTags 函数
const LegacyTableOfContents: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }

  return (
    <details id="toc" open={!fileData.collapseToc}>
      <summary>
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
      </summary>
      <ul>
        {fileData.toc.map((tocEntry) => (
          <li key={tocEntry.slug} className={`depth-${tocEntry.depth}`}>
            <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
              {removeHtmlTags(tocEntry.text)}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default ((opts?: Partial<Options>) => {
  const layout = opts?.layout ?? defaultOptions.layout
  return layout === "modern" ? TableOfContents : LegacyTableOfContents
}) satisfies QuartzComponentConstructor
