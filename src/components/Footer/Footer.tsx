import Link from "next/link"
import s from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <span>2024</span>
      <span>Create by Samari V</span>
      <a href="">GitHub link</a>
    </footer>
  )
}
