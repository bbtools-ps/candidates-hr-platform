interface IProps {
  copyrightLabel: string;
}

export default function Footer({ copyrightLabel }: IProps) {
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <p className="flex gap-2">
      © {getCurrentYear()}.
      <a
        className="font-bold text-gray duration-100 hover:text-blue"
        href="https://bogdan-bogdanovic.com/"
      >
        {copyrightLabel}
      </a>
    </p>
  );
}
