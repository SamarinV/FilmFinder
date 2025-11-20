import s from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <span>2024</span>
      <span>Create by Samarin V</span>
      <a href="https://github.com/SamarinV" target="_blank" rel="noopener noreferrer">
        GitHub link
      </a>
    </footer>
  )
}
