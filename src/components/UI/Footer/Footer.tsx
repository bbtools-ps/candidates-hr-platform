interface FooterProps {
  copyrightLabel: string;
}

export default function Footer({ copyrightLabel }: FooterProps) {
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <p className="flex gap-2">
      &copy; {getCurrentYear()}.
      <a
        className="font-bold text-gray duration-100 hover:text-blue dark:hover:text-sky-400"
        href="https://bogdan-bogdanovic.com/"
      >
        {copyrightLabel}
      </a>
    </p>
  );
}
