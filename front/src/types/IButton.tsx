export default interface ButtonProps {
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}