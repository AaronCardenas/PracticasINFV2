import styles from "../../styles/styleop.module.css";
export default function BossLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
