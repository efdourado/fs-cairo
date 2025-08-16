interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return <h2 className="font-semibold">{text}</h2>;
};