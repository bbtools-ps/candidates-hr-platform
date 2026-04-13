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
        className="text-gray hover:text-blue font-bold duration-100 dark:hover:text-sky-400"
        href="https://bogdan-bogdanovic.com/"
      >
        {copyrightLabel}
      </a>
    </p>
  );
}
