import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import footerCss from "./styles/footer.scss"
import { Rss } from "./Rss"
import { i18n } from "../i18n"
interface Options {
  links: Record<string, string>
}
export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    return (
      <footer class="footer" id="footer">
        <div class="outer">
          <div class="footer-left">
            <span>© {year} DamianDicky</span>
          </div>
        </div>
        <div class="extra-footer-link">
          <ul>
            <li>
              <a target="_blank" href="mailto:damiandicky@163.com">
                欢迎邮件反馈
              </a>
            </li>
            <li>
              <a target="_blank" href="https://qm.qq.com/q/H7kP9vu5W2">
                加入群聊
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }

  // 不知道为什么修改这个没有作用
  Footer.css = footerCss + Rss.css
  return Footer
}) satisfies QuartzComponentConstructor
